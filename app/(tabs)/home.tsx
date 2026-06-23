import { BottomSheet } from '@expo/ui';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TodoInterface {
  id: string;
  name: string;
}

const HomeScreen = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [todoname, setTodoName] = useState('');
  const [editTodo, setEditTodo] = useState('');
 const [isVisible, setisVisible] = useState(false);
  const handleSaveTodo = () => {
    const newTodo = { id: Math.random().toString(), name: todoname };

    setTodos([...todos, newTodo]);
    setTodoName('');
  };

  const DelteTodo=(id:string)=>{
    const newTodos=todos.filter((todo)=>todo.id!==id);
    setTodos(newTodos);
  }
  const saveEditTodo=(id:string)=>{
    const newTodo=todos.filter((prev)=>prev.id !==id)

    const edittedTodo={id:id,name:editTodo}


  }
  return (
    <>
    <View className='flex-1 items-center justify-center'>
      <Text>Todo App</Text>
      {/* <Host>
      <Button />
      </Host> */}
      <TouchableOpacity  onPress={()=>setisVisible((prev)=>!prev)}  style={{height:50,width:50}}>
        <Text>Titu maam</Text>
      </TouchableOpacity>
    </View>
    <BottomSheet isPresented={isVisible} onDismiss={()=>setisVisible(false)} snapPoints={['full']}   >
      {Array.from([50]).map((_,index)=>(
        <View className='flex-1 my-4' key={index}>
          <Text className='text-white'>Hello world{index}</Text>
        </View>
      ))}
    </BottomSheet>
      </>
  );
};

export default HomeScreen;
