import { Feed, Item } from "feed"
import axios from 'axios'
import fs from 'fs'

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
		created_date: Date
		modified_date: Date
	}
}

export interface XmrWishItemV2 {
	id: string
	description: string
	goal: number
	total: number
	contributors: number
	address: string
	percent: number
	created_date: Date
	modified_date: Date
	qr_img_url: string
	author_name: string
	author_email: string
}

const getData = async(url: string): Promise<XmrWishlistV2> => {
    const res = await axios.get(url)

	return res.data as XmrWishlistV2
}

const generatePost = (item: XmrWishItemV2, metadata: XmrWishlistV2['metadata']): Item => {
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
        date: item.created_date,
        image: metadata.image_url,
		author: [{
			name: item.author_name,
			email: item.author_email,
		}
	],
    }
}

export const generateRssFeedFromWishlistUrl = async(wishlistDataUrl: string): Promise<string> => {
    const wishlist = await getData(wishlistDataUrl)

	return generateRssFeedFromWishlist(wishlist)
}

export const generateRssFeedFromWishlist = (wishlist: XmrWishlistV2): string => {
	const postList: Item[] = []

	wishlist.wishlist.forEach(wish => postList.push(generatePost(wish, wishlist.metadata)))

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
	feed.addCategory("Wishlist")

	fs.writeFileSync(`dist/${wishlist.metadata.title.toLowerCase().replace(' ','-')}-wishlist-rss2.xml`, feed.rss2().toString())

	return feed.rss2()
}


