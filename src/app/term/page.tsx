import { Card } from "@nextui-org/react";
import React from "react";

const data = [
  {
    title: "1. Use of Services",
    content:
      "You agree to use Selendra Explorer solely for lawful purposes and in accordance with these Terms of Use. You are prohibited from using our services in any way that violates any applicable laws or regulations. ",
  },
  {
    title: "2. Intellectual Property",
    content:
      "All content and materials available on Selendra Explorer, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, and data compilations, are open and freely available for use by the public. We encourage sharing, distribution, and modification of these materials. They are not subject to copyright restrictions unless otherwise stated explicitly.",
  },
  {
    title: "3. No Warranty",
    content: `We provide Selendra Explorer on an "as is" and "as available" basis, without any representations or warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or free from viruses or other harmful components.`,
  },
  {
    title: "4. Limitation of Liability",
    content:
      "In no event shall Selendra be liable for any indirect, incidental, special, consequential, or punitive damages, arising out of or in connection with your use of our blockchain explorer. ",
  },
  {
    title: "5. Indemnification",
    content: `You agree to indemnify and hold harmless Selendra, its affiliates, partners, officers, directors and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of Selendra Explorer. 
  `,
  },
  {
    title: "6. Modification of Terms ",
    content:
      "We reserve the right to modify or revise these Terms of Use at any time. Any changes will be effective immediately upon posting the revised Terms of Use on our website. Your continued use of our services after the posting of any changes constitutes acceptance of those changes. ",
  },
  {
    title: "7. Termination",
    content:
      "We reserve the right to terminate or suspend your access to Selendra Explorer at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Use. ",
  },
  {
    title: "8. Governing Law ",
    content: `These Terms of Use shall be governed by and construed in accordance with the laws of The Kingdom of Cambodia, without regard to its conflict of law provisions. 
 `,
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions or concerns about these Terms of Use, please contact us at [selendrachain@gmail.com] 
  `,
  },
];

function Term() {
  return (
    <div className="px-4 sm:px-20 lg:px-80 mt-6">
      <div className="flex justify-center items-center my-6">
        {" "}
        <h2 className="text-3xl font-semibold">Term Of Use</h2>
      </div>
      <div>
        <p>
          Selendra provides information and services on the Selendra Explorer
          subject to the following terms and conditions:
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

export default Term;
