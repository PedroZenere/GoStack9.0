import * as Yup from 'yup'
import User from '../models/User'

const verifyUserExists = async (compEmail) => {
    return User.findOne({ where: { email: compEmail } })
}

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation error' })
        }

        const userExists = await verifyUserExists(req.body.email)

        if (userExists) {
            return res.status(400).json({ error: 'User email already exists.' })
        }

        const { id, name, email } = await User.create(req.body)

        return res.json({
            id,
            name,
            email,
        })
    }
}

export default new UserController()
