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
import fs from 'fs';
const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get(url);
    return res.data;
});
const generatePost = (item, metadata) => {
    return {
        title: item.description,
        id: item.id,
        link: `${metadata.url}#${item.id}`,
        description: `
        <p><strong>${item.description}</strong></p>
        <p>Donation Goal: ${item.goal} XMR</p>
        <p>Donation Address:</p>
		<p>${item.address}</p>
        <p><img class="thumbnail" src="${item.qr_img_url}" alt="Donate to this commission" /></p>
		<p><a href="${metadata.url}#${item.id}">View this commission on ${metadata.title}</a></p>
        `,
        date: item.created,
        image: metadata.image_url,
        author: [{
                name: item.author_name,
                email: item.author_email,
            }
        ],
    };
};
export const generateRssFromWishlistUrl = (wishlistDataUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield getData(wishlistDataUrl);
    const postList = [];
    wishlist.wishlist.forEach(wish => postList.push(generatePost(wish, wishlist.metadata)));
    const feed = new Feed({
        title: wishlist.metadata.title,
        description: wishlist.metadata.description,
        id: wishlist.metadata.title,
        link: wishlist.metadata.url,
        language: "en",
        image: wishlist.metadata.image_url,
        copyright: "",
        generator: "awesome",
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
    fs.writeFileSync(`dist/${wishlist.metadata.title.toLowerCase().replace(/\s/g, '-')}-wishlist-rss2.xml`, feed.rss2().toString());
    const title = 'XMR Community Art Fund';
    console.log(title.replace(/\s/g, '-'));
    return feed.rss2();
});
generateRssFromWishlistUrl('https://raw.githubusercontent.com/CryptoGrampy/xmr-wishlist-rss/master/wishlist-aas-example-v2.json');
//# sourceMappingURL=index.js.map