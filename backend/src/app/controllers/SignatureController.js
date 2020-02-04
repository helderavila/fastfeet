import Signature from '../models/Signature';

class SignatureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const signature = await Signature.create({
      name,
      path,
    });
    return res.json(signature);
  }
}

export default new SignatureController();
