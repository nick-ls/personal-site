import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
export default async function(cfg) {
	cfg.addPassthroughCopy("src/css");
	cfg.addPassthroughCopy("src/media");
	cfg.addPassthroughCopy("src/fonts");
	cfg.setLayoutsDirectory("templates");
	cfg.addPlugin(syntaxHighlight);
};