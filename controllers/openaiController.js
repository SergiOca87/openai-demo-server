const openai = require('../config/openAiConfig');

const generateText = async (req, res) => {
	const text = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content:
					'Generate a random short literary text, about 200 characters long, the text should have sense so please do not use Lorem Ipsum. Make it so that it does not end abruptly',
			},
		],
		max_tokens: 1000,
	});

	res.status(200).json({
		text: text.data.choices[0].message,
	});
};

const summarizeText = async (req, res) => {
	const { text } = req.body;

	const summarizedText = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `Can you summarize the text delimited by triple quotes into a single sentence? """ ${text} """ `,
			},
		],
		max_tokens: 100,
	});

	res.status(200).json({
		summarizedText: summarizedText.data.choices[0].message,
	});
};

const generateKeywords = async (req, res) => {
	const { text } = req.body;

	const keywords = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `Can you generate the 5 most relevant keywords from the text delimited by triple quotes? """ ${text} """ `,
			},
		],
		max_tokens: 100,
	});

	res.status(200).json({
		keywords: keywords.data.choices[0].message,
	});
};

const generateImage = async (req, res) => {
	const { summarizedText } = req.body;

	const image = await openai.createImage({
		prompt: `generate an image based on the what is delimited by triple quotes. """ ${summarizedText} """`,
		n: 2,
		// 256,512,1024 sizes allowed
		size: '512x512',
	});

	res.status(200).json({
		url: image.data.data[0].url,
	});
};

module.exports = {
	generateText,
	summarizeText,
	generateKeywords,
	generateImage,
};
