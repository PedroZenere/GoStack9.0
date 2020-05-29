import * as Yup from 'yup'
import Recipients from '../models/Recipients'

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().min(9).max(9),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' })
    }

    const {
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await Recipients.create(req.body)

    return res.status(200).json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    })
  }
}

export default new RecipientsController()
