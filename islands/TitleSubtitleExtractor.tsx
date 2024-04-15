import { useEffect, useState } from "preact/hooks";

interface TitleSubtitleExtractorProps {
  url: string;
}

const TitleSubtitleExtractor = ({ url }: TitleSubtitleExtractorProps) => {
  const [title, setTitle] = useState("Loading Title...");
  const [subtitle, setSubtitle] = useState("Loading Subtitle...");

  useEffect(() => {
    const urlObject = new URL(url);
    const category1Values = urlObject.searchParams.getAll("filter.category-1");
    const category3Values = urlObject.searchParams.getAll("filter.category-3");

    // Processa múltiplos valores para category-1 e category-3 para formar strings coerentes
    const category1Formatted = formatCategoryList(category1Values);
    const category3Formatted = formatCategoryList(category3Values);

    setTitle(category1Formatted || "Categoria");
    setSubtitle(category3Formatted || "Todas as Categorias");
  }, [url]);

  return (
    <div class="container px-4 sm:py-10">
      <div class="uppercase text-2xl">{title}</div>
      <div class="uppercase text-2xl font-bold">{subtitle}</div>
    </div>
  );
};

// Função auxiliar para formatar a lista de categorias
function formatCategoryList(categories: string[]) { // Explicitly typing the parameter
  if (categories.length > 1) {
    // Junta todos os elementos usando vírgula, exceto o último para usar 'e'
    return `${categories.slice(0, -1).join(", ")} e ${
      categories[categories.length - 1]
    }`;
  } else if (categories.length === 1) {
    return categories[0];
  }
  return "";
}

export default TitleSubtitleExtractor;
