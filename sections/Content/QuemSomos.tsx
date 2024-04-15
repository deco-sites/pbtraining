import { h } from "preact"; // Importação do Preact para JSX

export interface Props {
  text?: Text[];
}

export interface Text {
  title: string;
  content: string;
}

export default function QuemSomos({
  text = [
    {
      title: "Acesso a Produtos Autênticos",
      content:
        "A loja Conexões Culturais é crucial para proporcionar acesso a itens autênticos da cultura africana. Ela permite que os clientes adquiram artesanatos, roupas, alimentos e outros produtos diretamente de suas origens, valorizando a arte e a tradição dessas comunidades.",
    },
    {
      title: "Educação e Conscientização",
      content:
        "Além de oferecer produtos únicos, a Conexões Culturais serve como um espaço de educação e conscientização sobre a diversidade cultural. Através de seus produtos, a loja cria uma ponte entre diferentes culturas, permitindo que os clientes se envolvam e aprendam mais sobre os costumes, tradições e histórias dos povos africanos.",
    },
    {
      title: "Combate a Estereótipos",
      content:
        "Ao introduzir os clientes à rica cultura africana, a loja ajuda a combater estereótipos prejudiciais e promove uma compreensão mais completa e respeitosa das culturas africanas, contribuindo significativamente para a quebra de preconceitos e a valorização da diversidade.",
    },
    {
      title: "Impacto Econômico Positivo",
      content:
        "A Conexões Culturais também gera um impacto econômico positivo, apoiando diretamente artesãos e produtores africanos ao importar e vender seus produtos. Isso impulsiona as economias locais na África e, ao mesmo tempo, contribui para o desenvolvimento econômico da região onde a loja está localizada, atraindo tanto clientes locais quanto turistas interessados na cultura africana.",
    },
    {
      title: "Importância da Conexões Culturais",
      content:
        "Em suma, a existência da loja Conexões Culturais é de extrema importância. Ela não apenas proporciona acesso a produtos autênticos e promove a educação cultural, mas também é um exemplo inspirador de como o comércio pode ser uma ferramenta poderosa para fomentar o respeito e a compreensão entre diferentes culturas.",
    },
  ],
}: Props) {
  return (
    <div class="max-w-7xl mx-auto py-10 pb-24 grid grid-cols-1 gap-6">
      {text.map((item, index) => (
        <div
          key={index}
          class={`flex flex-col ${
            index % 2 === 0 ? "items-start text-left" : "items-end text-right"
          } w-full lg:w-2/4 ${
            index % 2 === 0 ? "ml-0 mr-auto" : "mr-0 ml-auto"
          }`}
        >
          <h3
            class={`text-gray-800 font-bold text-2xl mb-2 uppercase`}
          >
            {item.title}
          </h3>
          <p class="text-gray-800 text-base">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}
