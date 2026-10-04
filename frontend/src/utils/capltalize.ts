const capitalizeWord = (word: string) => {
  if (!word) return "";

  if (word.includes("_")) {
    const words = word.split("_")
    let newWords = []
    for (let i = 0; i < words.length; i++) {
      newWords.push(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
    }

    return newWords.join("_")
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export default capitalizeWord;