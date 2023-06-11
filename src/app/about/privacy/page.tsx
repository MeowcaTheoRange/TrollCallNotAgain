import Box from "@/components/Box/Box";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function PrivacyPage() {
  return (
    <Box title="Privacy Policy">
      <img className="panel" src="/assets/privacy/Keelez.png"></img>
      <hr />
      <ReactMarkdown>{`**Hi, welcome to the TrollCall privacy policy! Grab some cookies.**

Just to let you know, terms like "TrollCall", "We", "Our", "The \\[TrollCall\\] Service", and "Us" can refer to the moderators of TrollCall, or the TrollCall service itself.

Terms like "You", "Our Users" can refer to those who use TrollCall, like you, or anyone else on this service who owns a User Account.

Terms like "Third Parties", "Advertisers", "Google" can refer to any services that invade on your privacy! Or, you know, external services.

Anyway, here's the gist: We are a service that processes user data. It's possibly required that we specify how we process that data so that way you know how your data is stored.

If you want an in-depth overview of how TrollCall uses data throughout the full site stack, check out the [TrollCallNotAgain](https://github.com/MeowcaTheoRange/TrollCallNotAgain) repo on GitHub.

PERSONAL DATA
-------------

Here at TrollCall, it's our promise that we **do not** store any data about you other than what you have given us. We do not sell this data to any third parties, and anything personal that is given to TrollCall stays between you and the service.

The TrollCall Service may only store the following information about you:

*   Your username
*   Your user description
*   Your user link (URL)
*   Your user page color
*   Your flairs and accomplishments
*   Your user code
*   Your vague birthdate, Aspect, and Lunar Sway in the form of a True Sign choice
*   Your trolls and their data
*   Your dialoglogs

We would like to take this time to brag about the fact that we have more data on your trolls than we do on you.

WEB TECHNOLOGIES
----------------

TrollCall uses the Next.js and React technologies to display content to your browser, which means using some parts of the site may require **enabling JavaScript.** It also means we don't know how [obfuscated our site scripts are](https://www.gnu.org/philosophy/javascript-trap.html).

If you care about that stuff, please contact MeowcaTheoRange on [Mastodon](https://karkatdyinginagluetrap.com/@trollcall).

We also have to use cookies to store basic data, like login information. Here's a guide below to what you find if you go digging in the cookie jar:

### TROLLCALL\\_NAME

The name for identifying you as a user.

### TROLLCALL\\_CODE

The code for your user account, so you can actually access it.

---

Thank you so much for using TrollCall!

\\- **MeowcaTheoRange**`}</ReactMarkdown>
    </Box>
  );
}
