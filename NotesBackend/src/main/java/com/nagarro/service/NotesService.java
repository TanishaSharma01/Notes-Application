package com.nagarro.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.dao.NotesDao;
import com.nagarro.dao.UserDao;
import com.nagarro.entity.Notes;
import com.nagarro.entity.User;
import com.nagarro.exception.ApiRequestException;

@Service
public class NotesService {
	
	@Autowired
	NotesDao notesDao;
	
	@Autowired
	UserDao userDao;
	
	//getting recent 10 notes for the given user
	public List<Notes> getRecentNotesForUser(Long userId) {
	    User user = userDao.findById(userId)
	                      .orElseThrow(() -> new ApiRequestException("User not found"));

	    return notesDao.findTop10ByUserOrderByCreatedAtDesc(user);
	}
	
	//get all notes for given user
	public List<Notes> getAllNotesForUser(Long userId){
		User user = userDao.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found"));
		
		return notesDao.findByUser(user);
	}
	
	//create notes for user
	public Notes createNotesForUser(Long userId, String content) {
		User user = userDao.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found"));
		
		if(content.length() > 500) {
			throw new ApiRequestException("Note length exceeds 500 characters");
		}
		
		Notes note = new Notes();
		note.setUser(user);
		note.setContent(content);
		note.setCreatedAt(new Date());
		
		return notesDao.save(note);
	}
	
	//delete notes
	public void deleteNotesById(Long noteId) {
		Notes note = notesDao.findById(noteId).orElseThrow(()-> new ApiRequestException("Note not found"));
		notesDao.delete(note);
	}
	
	//sort notes by descending order of time created and then delete all notes other than the recent 10
	public void deleteOldNotes() {
		List<User> users = getAllUsers();
		
		for(User user: users) {
			List<Notes> notes = notesDao.findByUserOrderByCreatedAtDesc(user);
			if(notes.size()>10) {
				List<Notes> notesToDelete = notes.subList(10, notes.size());
				deleteNotes(notesToDelete);
			}
		}
	}
	
	//method to retrieve all users
	private List<User> getAllUsers() {
        return userDao.findAll();
    }
	
	//delete notes
	private void deleteNotes(List<Notes> notesToDelete) {
        notesDao.deleteAll(notesToDelete);
    }
	
	//get count
	public Long getCount(Long user_id) {
		Long count = this.notesDao.getNotesCount(user_id);
		return count;
	}
	
	//get Count of Users
	public Long getCountAllNotes()
	{
		return this.notesDao.count();
	}
}
