import { Card } from "@nextui-org/react";
import React from "react";

const data = [
  {
    title: "1. Information Collection",
    content:
      "We do not collect any personal information from users during their interaction with Selendra Explorer. Our system is designed to operate without the need for any user identification or tracking.",
  },
  {
    title: "2. Information Usage",
    content: `Any data displayed or accessed through Selendra Explorer is publicly available on the respective blockchain network. We do not alter or manipulate this data in any form. Our service is solely for providing a user-friendly interface to access publicly available blockchain data. 
  `,
  },
  {
    title: "3. Information Sharing",
    content:
      "Since we do not collect any personal information, there is no information to share with third parties. ",
  },
  {
    title: "4. Data Security",
    content:
      "We prioritize the security of the data accessible through our blockchain explorer. Our systems are regularly monitored and updated to ensure the integrity and confidentiality of the information.",
  },
  {
    title: "5. Cookies",
    content:
      "We do not use cookies or any other tracking mechanisms on our website. Your browsing activity on our blockchain explorer remains anonymous.",
  },
  {
    title: "6. Third-Party Links",
    content:
      "Our blockchain explorer may contain links to third-party websites or services. Please note that we are not responsible for the privacy practices of these third-party sites. We encourage you to review the privacy policies of those websites before providing any personal information.",
  },
  {
    title: "7. Policy Changes",
    content:
      "We reserve the right to update or modify this Privacy Policy at any time. Any changes to the policy will be reflected on this page with an updated effective date. Your continued use of our blockchain explorer after any modifications to this Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.",
  },
  {
    title: "8. Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or our practices, please contact us at [selendrachain@gmail.com].
    `,
  },
];

function Privacy() {
  return (
    <div className="px-4 sm:px-20 lg:px-80 mt-6">
      <div className="flex justify-center items-center my-6">
        {" "}
        <h2 className="text-3xl font-semibold">Privacy Policy</h2>
      </div>
      <div>
        <p>
          Thank you for using Selendra Explorer. This Privacy Policy is here to
          inform you about the types of information we may collect during your
          use of the blockchain explorer, how we use that information, and how
          we protect your privacy.
        </p>

        {data.map((x) => (
          <>
            <h3 className="font-semibold text-xl my-4">{x.title}</h3>
            <p>{x.content}</p>
          </>
        ))}
      </div>
    </div>
  );
}

export default Privacy;
