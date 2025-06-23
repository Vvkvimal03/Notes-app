import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Box
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  StickyNote2 as NotesIcon
} from "@mui/icons-material";
import NoteForm from "./NoteForm";
import Header from "./Header";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Prefilled demo data
  const demoNotes = [
    {
      id: 1,
      title: "Meeting Notes",
      description: "Quarterly team meeting discussion points and action items",
      date: "2024-01-15",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Project Ideas",
      description: "Brainstorming session for new product features and improvements",
      date: "2024-01-10",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Shopping List",
      description: "Weekly grocery shopping list and household items needed",
      date: "2024-01-08",
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) {
      setNotes(JSON.parse(stored));
    } else {
      // Set demo data if no notes exist
      setNotes(demoNotes);
      localStorage.setItem("notes", JSON.stringify(demoNotes));
    }
    setLoading(false);
  }, []);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const filtered = notes.filter((n) => n.id !== id);
    saveNotes(filtered);
    setDeleteConfirm(null);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleSubmit = (note) => {
    if (note.id) {
      const updated = notes.map((n) => (n.id === note.id ? note : n));
      saveNotes(updated);
    } else {
      note.id = Date.now();
      note.createdAt = new Date().toISOString();
      saveNotes([...notes, note]);
    }
    setEditingNote(null);
    setIsFormOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // DataGrid columns configuration
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" className="font-medium text-gray-800">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          className="text-gray-600 truncate"
          title={params.value}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={formatDate(params.value)} 
          variant="outlined" 
          size="small"
          className="text-teal-700 border-teal-200"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box className="flex justify-center space-x-1">
          <IconButton
            onClick={() => handleEdit(params.row)}
            className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => setDeleteConfirm(params.row)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const datagridSx = {
    borderRadius: 2,
    '& .MuiDataGrid-main': {
      borderRadius: 2,
      border: '3px solid rgb(56 202 179)',
    },
    '& .MuiDataGrid-columnHeaders': {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
    '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': {
      backgroundColor: 'rgb(56 202 179)',
    },
    '& .MuiTablePagination-root': {
      backgroundColor: 'rgb(56 202 179)',
      color: 'white',
      borderRadius: 2,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header title="My Notes" />

      <Container maxWidth="lg" className="py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <Typography variant="h4" className="font-bold text-gray-800 mb-2">
              Your Notes
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Manage your personal notes and ideas
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingNote(null);
              setIsFormOpen(true);
            }}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 normal-case"
          >
            Add New Note
          </Button>
        </div>

        {/* DataGrid */}
        <Box className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden h-96">
          <DataGrid
            rows={notes}
            sx={datagridSx}
            columns={columns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay: () => (
                <Box className="flex flex-col items-center justify-center h-64">
                  <NotesIcon className="text-gray-300 text-6xl mb-4" />
                  <Typography variant="h6" className="text-gray-500 mb-2">
                    No notes yet
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Create your first note to get started
                  </Typography>
                </Box>
              ),
            }}
          />
        </Box>

        {/* Note Form Dialog */}
        <Dialog 
          open={isFormOpen} 
          onClose={() => setIsFormOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            className: "rounded-xl shadow-2xl"
          }}
        >
          <DialogTitle className="bg-gradient-to-r from-teal-50 to-cyan-50 text-gray-800 font-semibold">
            {editingNote ? "Edit Note" : "Create New Note"}
          </DialogTitle>
          <DialogContent className="p-6">
            <NoteForm 
              onSubmit={handleSubmit} 
              initial={editingNote}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          PaperProps={{
            className: "rounded-xl shadow-2xl"
          }}
        >
          <DialogTitle className="text-gray-800 font-semibold">
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the note "{deleteConfirm?.title}"? 
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions className="p-4">
            <Button 
              onClick={() => setDeleteConfirm(null)}
              className="text-gray-600 hover:text-gray-800 normal-case"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(deleteConfirm.id)}
              variant="contained"
              className="bg-red-500 hover:bg-red-600 text-white normal-case"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Notes;