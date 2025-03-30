import {User} from '../Models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const JWT_SECRET = "!@#$%^&*()"; // TODO: Move to environment variables

export const register = async (req,res) => {
    const {name, gmail, password} = req.body

    // Validate inputs
    if (!name || !gmail || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        let user = await User.findOne({gmail})

        if(user) return res.status(400).json({message:"User already exists"});

        const hashPass = await bcrypt.hash(password, 10)

        user = await User.create({name, gmail, password: hashPass})

        // Don't return password in response
        user.password = undefined;

        return res.status(201).json({message:"User registered successfully", user})
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const login = async (req,res) => {
    const {gmail, password} = req.body

    // Validate inputs
    if (!gmail || !password) {
        return res.status(400).json({message: "Email and password are required"});
    }

    try {
        const user = await User.findOne({gmail});

        if(!user) return res.status(404).json({message:"User not found"})

        const validPass = await bcrypt.compare(password, user.password);

        if(!validPass) return res.status(401).json({message:"Invalid credentials"});
      
        const token = jwt.sign(
            {userId: user._id},
            JWT_SECRET,
            {expiresIn: '1d'}
        )

        return res.status(200).json({
            message: `Welcome ${user.name}`,
            token,
            user: {
                id: user._id,
                name: user.name,
                gmail: user.gmail
            }
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const profile = async (req,res) => {
    try {
        // Don't send password in response
        const user = req.user;
        user.password = undefined;
        
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}