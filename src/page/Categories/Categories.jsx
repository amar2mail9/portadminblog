import React from 'react';
import Layout from '../../components/Layout/Layout';
import { FaPlusCircle } from 'react-icons/fa';
import AllCategory from './AllCategory';


import Modal from '@mui/material/Modal';
import CreateCategory from './CreateCategory';

const Categories = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Layout>
      <div>
        {/* create section */}
        <section>
          <div className="flex justify-end mb-6">
            <button
              onClick={handleOpen}
              className="flex items-center gap-2 py-2 px-8 rounded-lg text-[1rem] bg-gradient-to-r from-gray-600 to-pink-800 text-white"
            >
              <FaPlusCircle /> Category
            </button>
          </div>
        </section>

        {/* display section */}
        <section>
          <AllCategory />
        </section>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateCategory />
      </Modal>
    </Layout>
  );
};

export default Categories;
