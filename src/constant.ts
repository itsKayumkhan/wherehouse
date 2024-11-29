import { productT } from "./types/product";

export const LOADER_IMG_URL =
  "https://blog.openreplay.com/images/3-ways-to-implement-skeleton-components-in-react/images/img3.gif";
export const USER_IMG_URL =
  "https://cdn3.iconfinder.com/data/icons/interface-106/24/User-128.png";

export const product: productT = {
  img:"https://res.cloudinary.com/dslgstzex/image/upload/v1703323363/cld-sample-5.jpg",
  name: "Love Contract ",
  quantity: 1,
  description:
    "This beautifully worded agreement for couples makes a sweet gift and romantic memento for life. Styled on legal agreements and printed on high-quality paper the love  agreement lists a variety of vows that the couple can make  together as a gesture for the future. Options: you get two  options in this love agreement (1) only paper printout of  love agreement (2) make it more beautiful with Framing ,  frame your love agreement and protect it from cuts & avoid  bursting. About this item Includes 1 pre-designed agreement  as shown Size: 8.3 x 11.7 inches Paper: 110 gsm glossy  Shipped safely in envelope to prevent damage",
  price: "299",
  // reviews: [
  //   {
  //     rating: 3.5,
  //     user: "kayum khan",
  //     photo: "https://storage.myphotoprint.in/products/2311061839530752.jpg",
  //     comment: "cute gift at such a affordable price.",
  //   },
  //   {
  //     rating: 4.5,
  //     user: "Afreen",
  //     photo: "https://storage.myphotoprint.in/products/2311061842087300.jpg",
  //     comment: "memorable gift..thank you myphotoprint",
  //   },
  //   {
  //     rating: 4.3,
  //     user: "Ali Hussain Shaikh ",
  //     photo: "https://storage.myphotoprint.in/reviews/f3.jpeg",
  //     comment: "Bhot sahi h yr..",
  //   },
  //   {
  //     rating: 4,
  //     user: "lavu",
  //     photo: "https://storage.myphotoprint.in/reviews/f1.jpeg",
  //     comment: "niceeee",
  //   },
  //   {
  //     rating: 4.5,
  //     user: "MONOTOSH monssutradhar",
  //     photo: "https://storage.myphotoprint.in/reviews/f2.jpeg",
  //     comment: "cute gift at such a affordable price.",
  //   },
  //   {
  //     rating: 3.5,
  //     user: "Aishwarya Soni",
  //     photo: "https://storage.myphotoprint.in/reviews/f5.jpeg",
  //     comment:
  //       "1 Day late delivery but my boyfriend loved it..so I'm happy too",
  //   },
  //   {
  //     rating: 4,
  //     user: "Anwar",
  //     photo: "https://storage.myphotoprint.in/products/2310241636554161.jpeg",
  //     comment: "HAHA Good creativity",
  //   },
  // ],
};

export const HEADER = (JWT_TOKEN:string) => ({ Authorization: `Bearer ${JWT_TOKEN}` });

export function sendWhatsAppMessage(message = " hello") {
  // Ensure the phone number is in international format with the '+' sign and country code
  const formattedPhoneNumber = "+918107697789";

  // URL encode the message
  const encodedMessage = encodeURIComponent(message);

  // Create the WhatsApp message link
  const whatsappLink = `https://wa.me/${formattedPhoneNumber}/?text=${encodedMessage}`;

  // Open the link in a new window
  window.open(whatsappLink, "_blank");
}

export const BrandName = "MyPhotoPrint";
