import { useState } from 'react'
import TrashIcon from './TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { BsGripVertical } from 'react-icons/bs';
import PropTypes from 'prop-types';

const ColumnContainer = ({ columnData, deleteColumn, updateColData }) => {
    const { title, id } = columnData;
    const [editMode, setEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState(title);



    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: id,
        data: {
            type: "column",
            columnData
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }


    if (isDragging) {
        return <div ref={setNodeRef}
            style={style}
            className='bg-[#0D1117] w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-30 border-2 border-rose-500'
        >

        </div>
    }

    return (
        <div
            ref={setNodeRef}
            style={style}


            className='bg-[#0D1117] w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col
        '>
            {/* //   Thi/s will help to intialt the drag and rop where it can hold and drag */}
            <div
                {...listeners}
                {...attributes}
                className='bg-[#0D1117] text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-[#161C22] border-4 flex justify-between'>
                <div className='flex gap-2'

                    onClick={() => {
                        setEditMode(true)
                    }}
                >

                    <div className='flex justify-center items-center bg-[#0D1117] px-2 py-0.5 text-sm'>
                        <BsGripVertical
                            size={18}
                            className='cursor-grab'

                        />

                    </div>
                    {!editMode && title}
                    {editMode && <input
                        autoFocus
                        onBlur={() => setEditMode(false)}
                        value={editTitle}
                        onChange={(e) => {
                            setEditTitle(e.target.value);
                            updateColData(columnData?.id, e.target.value);
                        }}
                    />}
                </div>
                <button onClick={() => deleteColumn(id)}>
                    <TrashIcon className="cursor-pointer" />
                </button>
            </div>
        </div>
    )
}


ColumnContainer.propTypes = {
    columnData: PropTypes.Array,
    deleteColumn: PropTypes.func,
    updateColData: PropTypes.func,

};



export default ColumnContainer;