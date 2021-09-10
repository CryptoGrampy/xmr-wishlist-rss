import { Feed } from "feed";

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
    description: '89gWT9S5mgx3gCJeADaS3Y57iBBot2QDVWaQweHbRxqphuHHfBJySiASCM8QRMRUhC6B2Mud2crtXHKCRkx96A8SJQAsUCk',
    content: 'test Content',
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