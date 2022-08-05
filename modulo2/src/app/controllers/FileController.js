import File from '../models/File';

class FileController{
  async store(req, res) {

    // no banco o originalname do que sera gravado como name
    // e o filename como path
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path
    });

    return res.json(file);
  }

}
export default new FileController();
