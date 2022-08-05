import { Router } from "express";
import Hashtag from '../models/Hashtag';
import HashtagsRepository from "../repositories/HashtagsRepository";

const plantsRouter = Router();


// simulando um banco
const hashtagsRepository = new HashtagsRepository();


plantsRouter.post('/', (request, response) => {

    const { hashtag, date } = request.body;

    const newHashtag = hashtagsRepository.create(hashtag, date);

    return response.json(newHashtag);
});

export default plantsRouter;
