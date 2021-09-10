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
    const res = yield axios.get('https://raw.githubusercontent.com/plowsof/plowsof.github.io/main/wishlist/wishlist-data.json?uid=69765');
    return res.data[0];
});
const generatePost = (wishItem) => {
    return {
        title: wishItem.desc,
        id: wishItem.desc,
        link: 'plowsof.github.io/index-old.html#head_patting_girl',
        description: `
        <p><strong>${wishItem.desc}</strong></p>
        <p>Goal: ${wishItem.goal}</p>
        <p>Total Donated: ${wishItem.total}</p>
        <p>Current # of Contributors: ${wishItem.contributors}</p>
        <p>Donation Address: ${wishItem.address}</p>
        <p>Dummy QR:</p>
        <p><img class="thumbnail" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.-9N4K3Syg-OgbET8dgDwqAHaHa%26pid%3DApi&f=1" alt="Donate to this commission" /></p>
        `,
        date: new Date('2021-09-10T03:24:00'),
        image: 'https://moneroart.neocities.org/monerochan-beach.jpg'
    };
};
export const generateFeeds = () => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield getData();
    let postList = [];
    wishlist.forEach(wish => postList.push(generatePost(wish)));
    const feed = new Feed({
        title: "XMR Community Art Fund",
        description: "Contribute to the XMR Art Community",
        id: "123feedid",
        link: "https://moneroart.neocities.org/",
        language: "en",
        image: "https://moneroart.neocities.org/monerochan-beach.jpg",
        copyright: "All rights reserved 2013, Crypto Grampy",
        generator: "awesome",
        feedLinks: {
            json: "https://moneroart.neocities.org/submissions/json",
            atom: "https://moneroart.neocities.org/submissions/atom"
        },
        author: {
            name: "CryptoGrampy",
            email: "cryptogrampy@protonmail.com.com",
            link: "https://cryptogrampy.com/"
        }
    });
    postList.forEach(post => {
        feed.addItem({
            title: post.title,
            id: post.id,
            link: post.link,
            description: post.description,
            content: post.content,
            author: [{
                    name: "Jane Doe",
                    email: "janedoe@example.com",
                    link: "https://example.com/janedoe"
                },
                {
                    name: "Joe Smith",
                    email: "joesmith@example.com",
                    link: "https://example.com/joesmith"
                }
            ],
            contributor: [{
                    name: "Shawn Kemp",
                    email: "shawnkemp@example.com",
                    link: "https://example.com/shawnkemp"
                },
                {
                    name: "Reggie Miller",
                    email: "reggiemiller@example.com",
                    link: "https://example.com/reggiemiller"
                }
            ],
            date: post.date,
            image: post.image
        });
    });
    feed.addCategory("Monero");
    feed.addCategory("Wishlist");
    feed.addContributor({
        name: "Plowof",
        email: "plowsof@example.com",
        link: "https://example.com/johancruyff"
    });
    console.log(feed.rss2());
    // Output: RSS 2.0
    // console.log(feed.atom1());
    // Output: Atom 1.0
    // console.log(feed.json1());
    // Output: JSON Feed 1.0
});
generateFeeds();
//# sourceMappingURL=index.js.map