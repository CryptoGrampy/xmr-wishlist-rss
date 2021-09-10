import { Feed, Item } from "feed"
import axios from 'axios'

export interface XmrWishlistV2 {
	wishes: XmrWishItemV2[]
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

const getData = async(): Promise<XmrWishItemV1[]> => {
    const res = await axios.get('https://raw.githubusercontent.com/plowsof/plowsof.github.io/main/wishlist/wishlist-data.json?uid=69765')

    return res.data[0] as XmrWishItemV1[]
}

const generatePost = (wishItem: XmrWishItemV1): Item => {
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
    }
}

export const generateFeeds = async() => {
    const wishlist = await getData()

	let postList: Item[] = []

	wishlist.forEach(wish => postList.push(generatePost(wish)))

    const feed = new Feed({
        title: "XMR Community Art Fund",
        description: "Contribute to the XMR Art Community",
        id: "123feedid",
        link: "https://moneroart.neocities.org/",
        language: "en",
        image: "https://moneroart.neocities.org/monerochan-beach.jpg",
        copyright: "All rights reserved 2013, Crypto Grampy",
        generator: "awesome", // optional, default = 'Feed for Node.js'
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
	feed.addCategory("Wishlist")

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
}

generateFeeds()
