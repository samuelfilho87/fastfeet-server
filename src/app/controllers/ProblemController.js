import Problems from '../schemas/Problems';

class ProblemController {
  async index(req, res) {
    const problems = await Problems.find({
      delivery_id: req.params.id,
    });

    return res.json(problems);
  }

  async store(req, res) {
    const { description } = req.body;

    const problem = await Problems.create({
      delivery_id: req.params.id,
      description,
    });

    return res.json(problem);
  }
}

export default new ProblemController();
