import Filesignature from '../models/Filesignature'

class FilesignatureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file

    const file = await Filesignature.create({
      name,
      path,
    })

    return res.json(file)
  }
}
export default new FilesignatureController()
