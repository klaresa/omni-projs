import { uuid } from "uuidv4";

class Hashtag {
    id: string;

    hashtag: string;

    date: Date;

    constructor(hashtag: string, date: Date) {
        this.id = uuid();
        this.hashtag = hashtag;
        this.date = date;
    }
}

export default Hashtag;
