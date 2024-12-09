import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AffiliateFAQ = () => {
  const faqs = [
    {
      question: "How do I claim my rewards?",
      answer: "Rewards are automatically credited to your account when a referred user makes a purchase. You can withdraw your earnings once you reach the minimum payout threshold of $50."
    },
    {
      question: "What is the commission structure?",
      answer: "You earn 40% commission on every successful referral. This applies to all subscription plans and is paid out monthly."
    },
    {
      question: "Can I offer my referrals a discount code?",
      answer: "Yes! As an affiliate, you'll get access to exclusive discount codes that you can share with your network."
    },
    {
      question: "Is there a time limit for my referrals to convert?",
      answer: "Your referral links have a 30-day cookie duration. If someone clicks your link and subscribes within 30 days, you'll earn the commission."
    }
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#E5DEFF]">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-[#E5DEFF]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};