import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { CircleCheckBigIcon, Trash2Icon, UndoIcon} from "lucide-react"

interface Item {
  titulo: string,
  concluido: boolean,
}

function Menu() {
  return (
    <div className="py-4 border-b">
      Lista de Tarefas
    </div>
  );
}

function TodoItem( {item, remover, concluir} : {item: Item, remover: () => void, concluir: () => void}){
  return (
    <div className={`flex items-center justify-between p-2 rounded-md border bg-slate-50 ${item.concluido ? 'opacity-25 hover:opacity-50' : '' }`}>
      <div className={item.concluido ? `line-through` : ''}>
        {item.titulo}
        </div>
      <div className="space-x-2">
        <Button variant="outline" size="icon" onClick={concluir}>
          {!item.concluido ? (<CircleCheckBigIcon className="h-4 w-4 text-green-700 " />) : (<UndoIcon className="h-4 w-4 text-green-700 " />)}
        
        </Button>
        <Button variant="outline" size="icon" onClick={remover}>
          <Trash2Icon className="h-4 w-4 text-red-700" />
        </Button>
      </div>
    </div>
  );
}

function Conteudo() {
  const [itens, setItens] = useState([] as Item[]);

  function submeterFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const f = e.target as HTMLElement;

    const titulo = f.querySelector('input')?.value

    if (titulo) {
      const item:Item = {
        titulo: titulo,
        concluido: false,
      }

      setItens([...itens, item]);

      f.querySelector('input')!.value = '';
    }
  }

  function remover(index: number) {
    if (confirm('certeza que deseja remover o item?')) {
      setItens(itens.filter((_, i) => i!== index));
    } else {
      return;
    }
  }

  function concluir(index: number){
    const item = itens[index];
    if (item.concluido){
      item.concluido = false;
    } else {
      item.concluido = true;
    }

    setItens([...itens]);
  }

  return (
    <div  className="space-y-4">
      <form onSubmit={(e) => submeterFormulario(e)}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Escreva uma tarefa..." />
          <Button type="submit">Adicionar</Button>
        </div>
      </form>


      <div className="space-y-4">

        {itens.map((item, index) => (
          <TodoItem key={index} item={item} remover={() => remover(index)} concluir={() => concluir(index)}/>
        ))}
      </div>
    </div>
  );
}

function Rodape() {
  return (
    <div className="py-2 border-t">
      TADS &copy; 2024
    </div>
  );
}

function App() {
  return (
    <div className = "m-4 space-y-6">
      <Menu />
      <Conteudo />
      <Rodape />
    </div>
  );
}

export default App
