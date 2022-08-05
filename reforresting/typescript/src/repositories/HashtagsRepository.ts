import Hashtag from "../models/Hashtag";

class HashtagsRepository {
    private hashtags: Hashtag[];

    constructor() {
        this.hashtags = [];
    }

    public findHashtag(hashtag: string) : Hashtag | null {
        const found = this.hashtags.filter(h => hashtag == h.hashtag);
        console.log(found);
    }

    public create(hashtag: string, date: Date): Hashtag {
        const newHashtag = new Hashtag(hashtag, date);

        this.hashtags.push(newHashtag)

        return newHashtag;
    }
}

export default HashtagsRepository;
