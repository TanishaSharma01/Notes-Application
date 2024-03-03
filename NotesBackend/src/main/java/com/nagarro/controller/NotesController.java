package com.nagarro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.entity.Notes;
import com.nagarro.exception.ApiRequestException;
import com.nagarro.model.ResponseJson;
import com.nagarro.service.NotesService;
import com.nagarro.utils.Constants;

@RestController
@CrossOrigin(origins=Constants.CLIENT_URL, allowCredentials = Constants.TRUE)
@RequestMapping(Constants.API_V1)
public class NotesController {
    
	@Autowired
	NotesService notesService;
	
	// Create a Note
    @PostMapping("/notes/user/{user_id}")
    public ResponseEntity<Object> createNote(@PathVariable Long user_id, @RequestBody Notes notes) {
    	try {
    		String content = notes.getContent();
            Notes createdNote = notesService.createNotesForUser(user_id, content);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson("Note successfully added",createdNote));
    	}
    	catch(Exception e) {
    		throw new ApiRequestException("Note could not be created");
    	}
    }

    // Retrieve Recent Notes for a User
    @GetMapping("/notes/user/{user_id}")
    public ResponseEntity<Object> getRecentNotes(@PathVariable Long user_id) {
        try {
        	List<Notes> recentNotes = notesService.getRecentNotesForUser(user_id);
        	return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(recentNotes));
        }
        catch(Exception e) {
        	throw new ApiRequestException("Notes could not be fetched for this user");
        }
    }
    
    // Delete a Note
    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<String> deleteNote(@PathVariable Long noteId) {
    	try {
    		notesService.deleteNotesById(noteId);
            return ResponseEntity.ok("Note deleted successfully");
    	}
    	catch(Exception e) {
    		throw new ApiRequestException("Note could not be deleted");
    	}
    }
    
    //Get count
    @GetMapping("/notes/count/{userId}")
    public Long countNotes(@PathVariable Long userId) {
    	try {
    		Long countNote = this.notesService.getCount(userId);
    		return countNote;
    	}
    	catch(Exception e) {
    		throw new ApiRequestException("Note count could not be fetched.");
    	}
    }
    
	//to count number of users
	@GetMapping("/notes/count-notes")
	public Long countAllNotes() {
		try {
		Long countNote= this.notesService.getCountAllNotes();
		return countNote;			
		}
		catch(Exception e) {
			throw new ApiRequestException("All note count could not be fetched.");
		}
	}
    
}
