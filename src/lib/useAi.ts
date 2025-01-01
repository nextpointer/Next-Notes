// lib/useGenerativeAI.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction:
    "You are an AI integrated into a Notes app, designed to generate, summarize, and auto-fill details within notes. Your core functions include:\n    Information Generation: Automatically generate relevant information based on brief inputs. When given a topic or query, generate a well-structured note with key details and facts, providing a clear starting point for the user.\n\n    Auto-Fill Details: Recognize and fill in missing or incomplete details within notes. If the user provides a partial note or a list, automatically suggest and complete the content where possible, ensuring the note remains coherent and comprehensive.\n\n    Summary and Ending: When a note is lengthy or needs a conclusion, summarize key points and suggest a closing sentence or paragraph. Your summaries should maintain the most relevant details and present a concise, logical ending.\n\n    Maintain Key Information: Keep the essential information intact, ensuring important dates, names, and concepts are highlighted or preserved in the final note. If the user is unsure about what to keep, offer suggestions for what’s most relevant to retain.\n\n    Tone and Clarity: Maintain a neutral, clear, and concise tone in your generated notes. Ensure all suggestions, completions, and summaries are easy to read and understand, avoiding unnecessary complexity.\n\nRemember all you generate in a markdown format and Maintain proper H1,H2,H3 and bullet points for better readability.",  
});

const generationConfig = {
  temperature: 1.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function getNoteContent(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: "create a notes on inflation" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, here's a note on inflation:\n\n# Inflation\n\n## Definition\nInflation is the rate at which the general level of prices for goods and services is rising, and, subsequently, purchasing power is falling. It is typically expressed as a percentage increase over a specific period.\n\n## Causes of Inflation\n*   **Demand-Pull Inflation:** Occurs when there is an increase in aggregate demand for goods and services that outstrips the economy's ability to supply them. This can result from factors such as increased consumer spending, government expenditure, or exports.\n*   **Cost-Push Inflation:** Arises when the costs of production (such as wages, raw materials, and energy) increase. These higher costs are passed on to consumers in the form of higher prices.\n*   **Built-in Inflation:** This is related to adaptive expectations, where people expect prices to continue to rise, leading to further wage increases and prices.\n\n## Types of Inflation\n*   **Creeping Inflation:** A slow and mild inflation, usually less than 3% per year.\n*   **Walking Inflation:** A more significant rise in prices, generally between 3-10% annually.\n*   **Galloping Inflation:** A very rapid and accelerating rate of inflation, usually greater than 10% annually.\n*   **Hyperinflation:** Extremely rapid and out-of-control inflation, potentially eroding the value of a currency quickly.\n\n## Measurement of Inflation\n*   **Consumer Price Index (CPI):** Measures the change in prices of a basket of goods and services purchased by a typical household.\n*  **Producer Price Index (PPI):** Measures the average change over time in selling prices received by domestic producers.\n\n## Effects of Inflation\n*   **Reduced Purchasing Power:** With rising prices, consumers can buy less with the same amount of money.\n*   **Impact on Savings:** The real value of savings can decrease over time if inflation outpaces interest rates.\n*   **Uncertainty:** Inflation creates uncertainty in business decisions, potentially affecting investment.\n*  **Redistribution of Wealth:**  Inflation can shift wealth from creditors to debtors, as the real value of money being paid back decreases.\n\n## Central Bank's Response\n*   **Monetary Policy:** Central banks may raise interest rates to curb spending, or manipulate other tools in an effort to control money supply.\n*   **Inflation Targeting:** Central banks may publicly announce explicit inflation targets to anchor inflation expectations.\n\n## Conclusion\nInflation is a key economic concept that is complex and important to understanding the economy, its different types, measurement and impacts. Understanding it can greatly benefit consumers and financial investors.\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Create a note on js oops" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'Okay, here\'s a note on JavaScript Object-Oriented Programming (OOP):\n\n# JavaScript Object-Oriented Programming (OOP)\n\n## Core Concepts\n\n*   **Objects:**\n    *   Fundamental building blocks in JavaScript.\n    *   A collection of properties (key-value pairs), where the values can be data or functions (methods).\n*   **Classes:**\n    *   Templates for creating objects. In ES6, classes were introduced as syntactic sugar over the prototypal inheritance.\n    *   Define properties and methods shared by all instances created from the class.\n*   **Constructors:**\n    *   Special methods within a class that initialize new objects created from the class.\n    *   Typically, the constructor sets the initial values of the object\'s properties.\n*   **Inheritance:**\n    *   A mechanism where a class can inherit properties and methods from another class.\n    *   Promotes code reuse and establishes hierarchical relationships between classes.\n    *   In JavaScript, prototypal inheritance is the primary model used.\n*   **Encapsulation:**\n    *   Bundling the data (properties) and the methods that operate on the data within a single unit (an object).\n    *   Controls access to internal object data to prevent unintended modification. Achieved partially using closures.\n*   **Abstraction:**\n    *   Hiding the complex implementation details and showing only the necessary features to the user.\n    *   Allows for simplified interaction and usage of objects without understanding their inner workings.\n*   **Polymorphism:**\n    *   The ability of different objects to respond to the same method call in their unique ways.\n    *   Often implemented using inheritance and interfaces or, in JS, duck-typing.\n\n## Key Features\n\n*   **Prototypal Inheritance:**\n    *   JavaScript uses prototypes as a mechanism for inheritance.\n    *   Objects inherit properties from their prototype objects.\n    *   `__proto__` property allows you to explore an object\'s prototype chain, but direct use is discouraged.\n\n*   **`this` keyword:**\n    *   In methods, refers to the current object. Its value depends on how the function is called (using `.`, apply(), call(), or as a constructor).\n\n*   **`class` keyword (ES6):**\n    *   Provides a cleaner and more familiar syntax for creating classes, compared to constructor functions in older JavaScript.\n    *   Still, at the core, these use the prototype mechanisms from earlier JavaScript.\n  *  **Static Methods:**\n       * Methods that are defined directly on a class not its objects, can be very useful for generic utility purposes.\n## Example\n    ```javascript\n    class Animal {\n        constructor(name) {\n            this.name = name;\n        }\n\n        speak() {\n            console.log("Generic animal sound");\n        }\n    }\n\n    class Dog extends Animal {\n      constructor(name, breed){\n          super(name);\n          this.breed = breed;\n      }\n      speak(){\n          console.log("Woof!");\n      }\n    }\n\n    let myDog = new Dog("Buddy", "Golden Retriver")\n\n    console.log(myDog.name)\n    myDog.speak();\n\n    ```\n\n## Benefits of OOP in JavaScript\n*   Improved code structure and maintainability\n*   Reusability of code through inheritance\n*   Organization into modular components\n\n## Conclusion\nWhile JavaScript is not strictly a class-based language, it uses OOP principles, through prototyping. It supports most concepts from classical OOP including inheritance, encapsulation, polymorphism and abstraction allowing for structuring projects for scale and maintainability. Understanding these concepts will help with writing good, clean and scalable code in JavaScript.\n',
          },
        ],
      },
    ],
  });
  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());

  return result?.response.text() || "No response came";
}
