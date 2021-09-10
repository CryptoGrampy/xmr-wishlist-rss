import { Feed } from "feed";
import axios from 'axios'

const getData = async() => {
    const res = await axios.get('https://raw.githubusercontent.com/plowsof/plowsof.github.io/main/wishlist/wishlist-data.json?uid=69765')

    return res.data[0][0]
}

const generateFeeds = async() => {
    const commissionData = await getData()

    const feed = new Feed({
        title: "XMR Community Art Fund",
        description: "Contribute to the XMR Art Community",
        content: "Test Content",
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

    const post = {
        title: 'Headpatting Doggirl Wownero',
        id: '89gWT9S5mgx3gCJeADaS3Y57iBBot2QDVWaQweHbRxqphuHHfBJySiASCM8QRMRUhC6B2Mud2crtXHKCRkx96A8SJQAsUCk',
        link: 'plowsof.github.io/index-old.html#head_patting_girl',
        description: `
        ${commissionData.desc}
        Goal: ${commissionData.goal}
        Total Donated: ${commissionData.total}
        Current # of Contributors: ${commissionData.contributors}
        Donation Address: ${commissionData.address}
        Dummy QR: <img class="thumbnail" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.-9N4K3Syg-OgbET8dgDwqAHaHa%26pid%3DApi&f=1" alt="Cheerleader" />
        `,
        date: new Date('1995-12-17T03:24:00'),
        image: 'https://moneroart.neocities.org/monero.png'
    }

    const posts = [post]

    posts.forEach(post => {
        feed.addItem({
            title: post.title,
            id: post.url,
            link: post.url,
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

    feed.addCategory("Technologie");

    feed.addContributor({
        name: "Johan Cruyff",
        email: "johancruyff@example.com",
        link: "https://example.com/johancruyff"
    });

    console.log(feed.rss2());
    // Output: RSS 2.0

    // console.log(feed.atom1());
    // Output: Atom 1.0

    // console.log(feed.json1());
    // Output: JSON Feed 1.0
}

await generateFeeds()