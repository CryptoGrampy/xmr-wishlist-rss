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
export const generateRssFeedFromWishlistUrl = (wishlistDataUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield getData(wishlistDataUrl);
    return generateRssFeedFromWishlist(wishlist);
});
export const generateRssFeedFromWishlist = (wishlist) => {
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
    fs.writeFileSync(`dist/${wishlist.metadata.title.toLowerCase().replace(' ', '-')}-wishlist-rss2.xml`, feed.rss2().toString());
    return feed.rss2();
};
const wishlist = {
    "wishlist": [{
            "goal": 0.7611524694111852,
            "total": 0.079568775615,
            "contributors": 1,
            "address": "8B98rGurDboU2XvfrqFJuA84E3U9J2f2cZPi63Cjnq9uec92V7J3NqRJHqA7h3i3K5Lh3fE7ZTxeRc6hk4UyovcmUdvobG3",
            "description": "Mixcloud Pro annual subscription (2021-2022)",
            "percent": 10.453723637861028,
            "created_date": "2021-09-12 03:23:59.436805",
            "modified_date": "2021-09-12 07:52:17.448989",
            "author_name": "",
            "author_email": "",
            "id": "8B98rGurDboU",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/8B98rGurDboU.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.2029739918429827,
            "total": 0.019892193904,
            "contributors": 1,
            "address": "87LxtQdft3658BogUHXekShCLzbeueL2P1H3dw3h824yMsvPXdbnYBcCphvbhiVu33HNnFGx7nU7eFEMbMpRU6eWNw5pRC5",
            "description": "ProtonMail Plus renewal (2022-2023)",
            "percent": 9.800365910617883,
            "created_date": "2021-09-12 03:24:00.185754",
            "modified_date": "2021-09-12 06:21:36.756512",
            "author_name": "",
            "author_email": "",
            "id": "87LxtQdft365",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/87LxtQdft365.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 1.0147069082514697,
            "total": 0.079568775615,
            "contributors": 1,
            "address": "85Dw6FurwyFgPbnsnW4v3cUTVeAkkvEw2jHvvaJ5PiyRGVvp4GcHyAQ71YTVC6637AMjrcP8yKdcoCHosWNEY1hz3HUXBeZ",
            "description": "OVH US VPS annual (2022-2023)",
            "percent": 7.84155256734301,
            "created_date": "2021-09-12 03:24:00.519789",
            "modified_date": "2021-09-12 06:33:12.879208",
            "author_name": "",
            "author_email": "",
            "id": "85Dw6FurwyFg",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/85Dw6FurwyFg.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 1.1415452717829035,
            "total": 0.079568775615,
            "contributors": 1,
            "address": "86xE6BVX3c32o6jtEHAsvd43qSr1Jzn1Jcr4hCdHkB9dgMCLg1ZpGvaNKbuhkf4E98UWFcag5m92oBLWQiqQbJvYEw4r9Af",
            "description": "XMR.radio domain renewal (2022-2023)",
            "percent": 6.970268948749342,
            "created_date": "2021-09-12 03:23:59.821446",
            "modified_date": "2021-09-12 12:00:58.947352",
            "author_name": "",
            "author_email": "",
            "id": "86xE6BVX3c32",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/86xE6BVX3c32.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 6.341918176571686,
            "total": 0.34727517581300005,
            "contributors": 2,
            "address": "8Bxyj1J5KfVWLxZcrH7kjtNRTAmCSLFRZiJpxp5RtZRz9YFGyhUEwwZPucPGHaYVKsYBCCtiPRy6BMyUL5soGd9KFfnmKFn",
            "description": "Music acquisition budget (2022-2023)",
            "percent": 5.4758696997369665,
            "created_date": "2021-09-12 03:24:01.005094",
            "modified_date": "2021-09-12 12:57:38.965332",
            "author_name": "",
            "author_email": "",
            "id": "8Bxyj1J5KfVW",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/8Bxyj1J5KfVW.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 1.9324815473383978,
            "total": 0,
            "contributors": 0,
            "address": "85vWUxkpPSw2awQrouD5mkVLyG6voEMQpdD8KZM3TVfPSriBWhX7Au4cdHHgaDQx4bQJoQXgpijtDaLshqLbNjcsN6Vzba9",
            "description": "Rode Wireless GO II 2-Person Lavalier Microphone System/Recorder Kit",
            "percent": 0,
            "created_date": "2021-09-12 03:24:01.477884",
            "modified_date": "2021-09-12 03:24:01.477912",
            "author_name": "",
            "author_email": "",
            "id": "85vWUxkpPSw2",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/85vWUxkpPSw2.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.08457249660124279,
            "total": 0,
            "contributors": 0,
            "address": "89yR6wHYngjgxvMXubZjbd8g7kt3iocThZaQ9vDx74iG2d2aBCBnjSeDCaGKMpZ1SSdNY4TAyF9bZ8siHm3UGL9K62mMfpZ",
            "description": "Rode Wireless GO Case",
            "percent": 0,
            "created_date": "2021-09-12 03:24:01.843447",
            "modified_date": "2021-09-12 03:24:01.843468",
            "author_name": "",
            "author_email": "",
            "id": "89yR6wHYngjg",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/89yR6wHYngjg.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.05497212279080782,
            "total": 0,
            "contributors": 0,
            "address": "86K8gZC2roNAiVZ9boVWQVUX2bU6KCecAbBM1rhpLZGHHtBQUChukoXXP3SWjaYSsCgCUGaFvwAjkJZAhPeZK88zN46msfz",
            "description": "TRS to XLR breakout cable, 3.3 feet",
            "percent": 0,
            "created_date": "2021-09-12 03:24:02.230519",
            "modified_date": "2021-09-12 03:24:02.230545",
            "author_name": "",
            "author_email": "",
            "id": "86K8gZC2roNA",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/86K8gZC2roNA.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.12261041808038592,
            "total": 0,
            "contributors": 0,
            "address": "86AJAxavmaL2hvowhGs5gHGkLDGHoBgUYGGacSDuHGE1Si14KqHbyfx1YqzkfS2h3E4n5QefQtd7S4g9YxovPfaXHKdLMVe",
            "description": "Rode Interview GO Handheld Mic Adapter for the Wireless GO",
            "percent": 0,
            "created_date": "2021-09-12 03:24:02.617240",
            "modified_date": "2021-09-12 03:24:02.617259",
            "author_name": "",
            "author_email": "",
            "id": "86AJAxavmaL2",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/86AJAxavmaL2.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.634293724509321,
            "total": 0,
            "contributors": 0,
            "address": "8AP95vZNoog7jEmRzmRMxmR8aAa1uFH3oiMaczjo7KYXKNTceBQkRNxLuXKicN61Wgf28TFzcgmbFRfjKm6VLbNx2BLpV5t",
            "description": "Audio-Technica ATH-M50X",
            "percent": 0,
            "created_date": "2021-09-12 03:24:02.986971",
            "modified_date": "2021-09-12 03:24:02.986991",
            "author_name": "",
            "author_email": "",
            "id": "8AP95vZNoog7",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/8AP95vZNoog7.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.0634293724509321,
            "total": 0,
            "contributors": 0,
            "address": "84QzYrxCxHJ4r6sRyqE6HVi8ZGxvVCDxhK4YkYm3Khi5imcCGxozDADeo6KxsPKRC2W8HD9ei2QPh81vyzBn1iPkTWaVf89",
            "description": "Audio-Technica Case",
            "percent": 0,
            "created_date": "2021-09-12 03:24:03.350910",
            "modified_date": "2021-09-12 03:24:03.350937",
            "author_name": "",
            "author_email": "",
            "id": "84QzYrxCxHJ4",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/84QzYrxCxHJ4.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.7188662211105638,
            "total": 0,
            "contributors": 0,
            "address": "83RNVysW2M1jPyVSzYJmWRDSQQmAH2aHHhBtoLis7X2nYA6dq752Z9K7vtDkcSgpaxddvc7Jj62rPTMebeNz4jhi4NPzB25",
            "description": "Focusrite Scarlett 2i2 2x2 USB Audio Interface (3rd Gen)",
            "percent": 0,
            "created_date": "2021-09-12 03:24:03.735394",
            "modified_date": "2021-09-12 03:24:03.735419",
            "author_name": "",
            "author_email": "",
            "id": "83RNVysW2M1j",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/83RNVysW2M1j.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.06765799728099424,
            "total": 0,
            "contributors": 0,
            "address": "89kmrkP9ig1B1rvL4pnXJXNcFX9TcUtjLFcsxF88b7fKfE8zr2WfitL3znkqzoxowFUHgWyQusFmoDpn91kf5LezUJrJgri",
            "description": "Focusrite Scarlett case",
            "percent": 0,
            "created_date": "2021-09-12 03:24:04.123536",
            "modified_date": "2021-09-12 03:24:04.123572",
            "author_name": "",
            "author_email": "",
            "id": "89kmrkP9ig1B",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/89kmrkP9ig1B.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 1.0569863627619476,
            "total": 0,
            "contributors": 0,
            "address": "86VTYd17e4y4V79c82GWb8jSWz1K2tD3BSPAJhHrjAwYaQNkq8wsQw7PAsyWT2zPBZa3s4B8t5K8Y1ntJCWYUw5i2Ji33ig",
            "description": "Samsung 2TB T5 Portable SSD",
            "percent": 0,
            "created_date": "2021-09-12 03:24:04.465212",
            "modified_date": "2021-09-12 03:24:04.465229",
            "author_name": "",
            "author_email": "",
            "id": "86VTYd17e4y4",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/86VTYd17e4y4.png",
            "title": "XMR.radio donation"
        },
        {
            "goal": 0.042286248300621394,
            "total": 0,
            "contributors": 0,
            "address": "86y4QiHDJv7jHj9LxYGLKt6kn5Uq9vfq8jRkKVFLNq6X5Ma6kBhmaoAWaQgGVebq3C25MyezwhDn3AaXrJRgFL11DjMDWWF",
            "description": "Samsung T5 Case",
            "percent": 0,
            "created_date": "2021-09-12 03:24:04.827422",
            "modified_date": "2021-09-12 03:24:04.827447",
            "author_name": "",
            "author_email": "",
            "id": "86y4QiHDJv7j",
            "qr_img_url": "https://raw.githubusercontent.com/plowsof/funding-xmr-radio/main/qr_codes/86y4QiHDJv7j.png",
            "title": "XMR.radio donation"
        }
    ],
    "metadata": {
        "total": 10,
        "contributors": 4,
        "modified": "2021-09-13 12:44:21.882923",
        "title": "XMR Radio Wishlist",
        "description": "Contribute to the XMR Radio Wishlist",
        "image": "https://thumbnailer.mixcloud.com/unsafe/320x320/profile/7/2/f/7/032c-1d38-4f86-9714-65649d291a8a",
        "url": "https://xmr.radio/funding"
    }
};
generateRssFeedFromWishlist(wishlist);
//# sourceMappingURL=index.js.map