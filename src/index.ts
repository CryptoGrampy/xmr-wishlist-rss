import { Feed, Item } from "feed"
import axios from 'axios'

export interface XmrWishlistV2 {
	wishlist: XmrWishItemV2[]
	metadata: {
		title: string
		description: string
		image_url: string
		url: string
		main_address: string
		view_key: string
		wallet_file_url: string
		created_by: string
		email: string
		created: Date
		modified: Date
	}
}

export interface XmrWishItemV2 {
	title: string
	id: string
	description: string
	goal: number
	total: number
	contributors: number
	address: string
	percent: number
	created: Date
	modified: Date
	qr_img_url: string
	author_name: string
	author_email: string
}

export interface XmrWishItemV1 {
	goal: number,
	total: number,
	contributors: number,
	address: string,
	desc: string,
	percent: number
}

const getData = async(): Promise<XmrWishlistV2> => {
    const res = await axios.get('https://raw.githubusercontent.com/plowsof/wish-rss/main/wishlist-rss-draft.json')

	return res.data as XmrWishlistV2
}

const generatePost = (wishItem: XmrWishItemV2, url: string): Item => {
	return {
        title: wishItem.description,
        id: wishItem.id,
        link: `${url}#${wishItem.id}`,
        description: `
        <p><strong>${wishItem.description}</strong></p>
        <p>Goal: ${wishItem.goal}</p>
        <p>Total Donated: ${wishItem.total}</p>
        <p>Current # of Contributors: ${wishItem.contributors}</p>
        <p>Donation Address: ${wishItem.address}</p>
        <p>QR:</p>
        <p><img class="thumbnail" src="${wishItem.qr_img_url}" alt="Donate to this commission" /></p>
        `,
        date: wishItem.created,
        image: 'https://moneroart.neocities.org/monerochan-beach.jpg',
		author: [{
			name: wishItem.author_name,
			email: wishItem.author_email,
		}
	],
    }
}

export const generateFeeds = async(): Promise<void> => {
    const wishlist = await getData()

	const postList: Item[] = []

	wishlist.wishlist.forEach(wish => postList.push(generatePost(wish, wishlist.metadata.url)))

    const feed = new Feed({
        title: wishlist.metadata.title,
        description: wishlist.metadata.description,
        id: wishlist.metadata.title,
        link: wishlist.metadata.url,
        language: "en",
        image: wishlist.metadata.image_url,
        copyright: "",
        generator: "awesome", // optional, default = 'Feed for Node.js'
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
	feed.addCategory("Wishlist")

    console.log(feed.rss2());
    // Output: RSS 2.0

    // console.log(feed.atom1());
    // Output: Atom 1.0

    // console.log(feed.json1());
    // Output: JSON Feed 1.0
}

generateFeeds()
