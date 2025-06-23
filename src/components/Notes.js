import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Logout as LogoutIcon,
  StickyNote2 as NotesIcon
} from "@mui/icons-material";
import NoteForm from "./NoteForm";
import { useAuth } from "../context/AuthContext";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AppBar position="static" className="bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
        <Toolbar>
          <NotesIcon className="mr-3" />
          <Typography variant="h6" className="flex-grow font-semibold">
            My Notes
          </Typography>
          <div className="flex items-center space-x-4">
            <Typography variant="body2" className="hidden sm:block">
              Welcome, {user?.name || user?.email}
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              className="hover:bg-white/20 transition-colors"
            >
              <LogoutIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

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

        {/* Notes Table */}
        <Paper className="shadow-xl rounded-xl overflow-hidden border border-gray-200">
          <TableContainer>
            <Table>
              <TableHead className="bg-gradient-to-r from-teal-50 to-cyan-50">
                <TableRow>
                  <TableCell className="font-semibold text-gray-700">Title</TableCell>
                  <TableCell className="font-semibold text-gray-700">Description</TableCell>
                  <TableCell className="font-semibold text-gray-700">Date</TableCell>
                  <TableCell className="font-semibold text-gray-700" align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" className="py-12">
                      <div className="text-center">
                        <NotesIcon className="text-gray-300 text-6xl mb-4" />
                        <Typography variant="h6" className="text-gray-500 mb-2">
                          No notes yet
                        </Typography>
                        <Typography variant="body2" className="text-gray-400">
                          Create your first note to get started
                        </Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  notes.map((note) => (
                    <TableRow key={note.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-800">
                        {note.title}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-md">
                        <div className="truncate">
                          {note.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={formatDate(note.date)} 
                          variant="outlined" 
                          size="small"
                          className="text-teal-700 border-teal-200"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center space-x-2">
                          <IconButton
                            onClick={() => handleEdit(note)}
                            className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setDeleteConfirm(note)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

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
