import { useMemo, useState } from 'react'
import PlusIcon from './Plusicon'
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

const DndExample = () => {

  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns?.map(items => items?.id), [columns]);
  const [activeColumns, setActiveColumns] = useState();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    }
    ))

  console.log(activeColumns, "activeColumns");

  const genrateId = () => {
    return Math.floor(Math.random() * 10001)
  }

  const createNewColumn = () => {
    const columnToAdd = {
      id: genrateId(),
      title: `Column ${columns?.length + 1}`
    }
    setColumns([...columns, columnToAdd])
  }

  // const deleteColumn = (ID) => {
  //   const filterColumn = columns.filter(items => items?.id !== ID)
  //   setColumns(filterColumn)
  // }


  const deleteColumn = (id) => {
    const newFilterCol = columns.filter(items => items?.id !== id);
    setColumns(newFilterCol)
  }

  console.log(columns, "column")

  const updateColData = (id, data) => {
    console.log(id, data);

    return setColumns(prev =>
      prev.map(items =>
        items?.id === id ? { ...items, title: data } : items
      )
    )

    // const colData = columns.map((items) => {

    // if (items?.id !== id) return items;


    // });




  }


  const handleDragStart = (e) => {
    console.log(e, "Drag start");
    if (e.active.data.current.type === "column") {
      setActiveColumns(e.active.data.current.columnData);
      return;
    }
  }

  const handleDragEnd = (e) => {
    console.log(e, "Drag end");
    const { active, over } = e;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;


    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {

      const activeColumnIndex = columns.findIndex(items => items?.id === activeColumnId);

      const overColumnIndex = columns.findIndex(items => items?.id === overColumnId);

      console.log(activeColumnIndex, overColumnIndex, "This is indexs")

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }



  return (
    <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>


      {/* Makking the Thing raggable  */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <div className='m-auto flex gap-4'>
          <div className='flex gap-4'>
            <SortableContext items={columnsId}>
              {columns?.map((items, index) => (
                <span key={index}>
                  <ColumnContainer columnData={items} deleteColumn={deleteColumn} updateColData={updateColData} />
                </span>
              ))}
            </SortableContext>
          </div>
          <button onClick={createNewColumn} className='h-[60px] w-[350px] min-w-[350px] items-center justify-center text-white bg-[#0D1117] border-2 border-[#161C22] flex gap-2 mt-2 cursor-pointer rounded-lg hover:ring-2 ring-red-400'>
            <PlusIcon />
            Add Column</button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumns &&
              <ColumnContainer
                columnData={activeColumns}
                deleteColumn={deleteColumn}
                updateColData={updateColData}
              />}

          </DragOverlay>, document.body)}
      </DndContext>
      {/* <?p className='text-cyan-500'>Hello Viraj</p> */}
    </div>
  )
}

export default DndExample