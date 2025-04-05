"use client";

import { useState } from "react";

export default function Home() {
  const now = new Date();

  const [prompt, setPrompt] = useState("");
  const [hiringName, setHiringName] = useState("");
  const [hiringRole, setHiringRole] = useState("");
  const [hiringEmail, setHiringEmail] = useState("");
  const [hiringAddress, setHiringAddress] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [contractorRole, setContractorRole] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");
  const [contractorAddress, setContractorAddress] = useState("");
  const [song, setSong] = useState("");
  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deliverable, setDeliverable] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [oneTime, setOneTime] = useState("");
  const [copyrightOwner, setCopyrightOwner] = useState("");
  const [creditName, setCreditName] = useState("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const questions = [
    {
      id: 1,
      question: "What is the full legal name of the hiring party?",
      setter: setHiringName,
      value: hiringName,
      placeholder: "e.g. John Doe",
    },
    {
      id: 2,
      question: "What is the role of the hiring party?",
      setter: setHiringRole,
      value: hiringRole,
      placeholder: "e.g., artist, producer, label",
    },
    {
      id: 3,
      question: "What is the email of the hiring party?",
      setter: setHiringEmail,
      value: hiringEmail,
      placeholder: "e.g. Johndoe@email.com",
    },
    {
      id: 4,
      question: "What is the address of the hiring party?",
      setter: setHiringAddress,
      value: hiringAddress,
      placeholder: "e.g. 123 abc street, Charlotte, NC, 28208",
    },
    {
      id: 5,
      question: "What is the full legal name of the contractor?",
      setter: setContractorName,
      value: contractorName,
      placeholder: "e.g. Jane Doe",
    },
    {
      id: 6,
      question: "What is the role of the contractor?",
      setter: setContractorRole,
      value: contractorRole,
      placeholder: "e.g., session musician, beatmaker",
    },
    {
      id: 7,
      question: "What is the email of the contractor?",
      setter: setContractorEmail,
      value: contractorEmail,
      placeholder: "e.g. Janedoe@email.com",
    },
    {
      id: 8,
      question: "What is the address of the contractor?",
      setter: setContractorAddress,
      value: contractorAddress,
      placeholder: "e.g. 1212 abc street, Charlotte, NC, 28208",
    },
    {
      id: 9,
      question: "What is the song title?",
      setter: setSong,
      value: song,
      placeholder: "Heads Will Roll",
    },
    {
      id: 10,
      question: "What is the type of work?",
      setter: setType,
      value: type,
      placeholder:
        "e.g. Instrumental beat, guitar tracking, topline vocals, mixing, songwriting, etc.",
    },
    {
      id: 11,
      question: "What is the delivery deadline?",
      setter: setDeadline,
      value: deadline,
      placeholder: "e.g. 4/6/2025",
    },
    {
      id: 12,
      question: "What is the deliverable?",
      setter: setDeliverable,
      value: deliverable,
      placeholder: "e.g. WAV files, Stems, MIDI, Pro Tools session, etc.",
    },
    {
      id: 13,
      question: "What is the payment amount?",
      setter: setPaymentAmount,
      value: paymentAmount,
      placeholder: "$2000",
    },
    {
      id: 14,
      question: "What is the payment method?",
      setter: setPaymentMethod,
      value: paymentMethod,
      placeholder: "e.g. Venmo, Cash, etc.",
    },
    {
      id: 15,
      question: "What is the payment due date?",
      setter: setDueDate,
      value: dueDate,
      placeholder: "4/10/2025",
    },
    {
      id: 16,
      question: "Is this a one time payment?",
      setter: setOneTime,
      value: oneTime,
      placeholder: "Yes/No",
    },
    {
      id: 17,
      question: "Who owns the copyright?",
      setter: setCopyrightOwner,
      value: copyrightOwner,
      placeholder: "e.g. John Doe",
    },
    {
      id: 18,
      question: "What is the preferred credit name?",
      setter: setCreditName,
      value: creditName,
      placeholder: "e.g. John Doe",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = async () => {
    currentQuestion.setter(inputValue);
    setInputValue("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const prompt =
        "You are a music law expert. Generate a work for hire agreement based on the following information: " +
        `It is currently ${now}` +
        `Hiring Party: ${hiringName}, ${hiringRole}, ${hiringEmail}. ` +
        `Contractor: ${contractorName}, ${contractorRole}, ${contractorEmail}. ` +
        `Song Title: ${song}. Type of Work: ${type}. Delivery Deadline: ${deadline}. ` +
        `Deliverable: ${deliverable}. Payment Amount: ${paymentAmount}. Payment Method: ${paymentMethod}. ` +
        `Payment Due Date: ${dueDate}. One Time Payment: ${oneTime}. Copyright Owner: ${copyrightOwner}. ` +
        `Preferred Credit Name: ${creditName}. ` +
        `Place the contract text between quadruple backticks`;
      console.log("prompt", prompt);
      setPrompt(prompt);
      const response = await fetch(`/api/generateContract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      const contract = await response.text();
      const extractedText = contract.match(/````([\s\S]*?)````/)?.[1] || "";
      const formattedText = extractedText.replace(/\\n/g, "\n");
      const formattedText2 = formattedText.replace(/\\/g, "");
      const ipfsResponse = await fetch(`/api/pinToIpfs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contract: formattedText2 }),
      });
      const ipfsHash = await ipfsResponse.text();
      console.log("IPFS Hash:", ipfsHash);
      alert(
        "Contract generated and pinned to IPFS! check out: https://ipfs.io/ipfs/" +
          ipfsHash.split('"')[1]
      );
    }
  };

  const handleBack = () => {
    currentQuestion.setter(inputValue);
    setInputValue("");
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      alert("This is the first question!");
    }
  };
  console.log(prompt);
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 sm:p-20 font-sans">
      <p className="text-[250%]">Work For Hire Agreement Generator</p>
      <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white rounded-lg shadow-lg w-full sm:w-[600px] text-center">
        <label className="text-xl font-semibold">
          {currentQuestion.question}
        </label>
        <input
          type="text"
          value={inputValue}
          placeholder={currentQuestion.placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 outline"
        />
        <button
          onClick={handleNext}
          className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
        <button
          onClick={handleBack}
          className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}
