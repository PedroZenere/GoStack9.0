import { Op } from 'sequelize'
import Orders from '../models/Orders'
import Recipients from '../models/Recipients'
import Filesignature from '../models/Filesignature'

class SingleordersController {
  async index(req, res) {
    const { id } = req.params
    const { page = 1 } = req.query

    const singleOrder = await Orders.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: { [Op.ne]: null },
      },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'recipient_id', 'deliveryman_id', 'product'],
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'id',
            'nome',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
          include: [
            {
              model: Filesignature,
              as: 'signature',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    })

    if (!singleOrder) {
      return res.status(400).json({ error: 'Deliveryman not found' })
    }

    return res.json(singleOrder)
  }
}

export default new SingleordersController()
