export default async function(cfg) {
	cfg.addPassthroughCopy("src/css");
	cfg.addPassthroughCopy("src/media");
	cfg.setLayoutsDirectory("templates");
};