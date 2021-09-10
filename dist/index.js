var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Feed } from "feed";
import axios from 'axios';
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get('https://raw.githubusercontent.com/plowsof/wish-rss/main/wishlist-rss-draft.json');
    return res.data;
});
const generatePost = (wishItem, metadata) => {
    return {
        title: wishItem.description,
        id: wishItem.id,
        link: `${metadata.url}#${wishItem.id}`,
        description: `
        <p><strong>${wishItem.description}</strong></p>
        <p>Donation Goal: ${wishItem.goal}</p>
        <p>Donation Address: ${wishItem.address}</p>
        <p><img class="thumbnail" src="${wishItem.qr_img_url}" alt="Donate to this commission" /></p>
		<p><a href="${metadata.url}#${wishItem.id}">View this commission on ${metadata.title}</a></p>
        `,
        date: wishItem.created,
        image: 'https://moneroart.neocities.org/monerochan-beach.jpg',
        author: [{
                name: wishItem.author_name,
                email: wishItem.author_email,
            }
        ],
    };
};
export const generateFeeds = () => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield getData();
    const postList = [];
    wishlist.wishlist.forEach(wish => postList.push(generatePost(wish, wishlist.metadata)));
    const feed = new Feed({
        title: wishlist.metadata.title,
        description: wishlist.metadata.description,
        id: wishlist.metadata.title,
        link: wishlist.metadata.url,
        language: "en",
        image: 'https://moneroart.neocities.org/monerochan-beach.jpg',
        copyright: "",
        generator: "awesome",
        feedLinks: {
            json: "https://moneroart.neocities.org/submissions/json",
            atom: "https://moneroart.neocities.org/submissions/atom"
        },
        author: {
            name: wishlist.metadata.created_by,
            email: wishlist.metadata.email,
            link: wishlist.metadata.url
        }
    });
    postList.forEach(post => {
        feed.addItem(post);
    });
    feed.addCategory("Monero");
    feed.addCategory("Wishlist");
    console.log(feed.rss2());
    // Output: RSS 2.0
    // console.log(feed.atom1());
    // Output: Atom 1.0
    // console.log(feed.json1());
    // Output: JSON Feed 1.0
});
generateFeeds();
//# sourceMappingURL=index.js.map