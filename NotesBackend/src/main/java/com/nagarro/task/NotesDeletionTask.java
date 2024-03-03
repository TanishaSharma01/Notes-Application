package com.nagarro.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.nagarro.service.NotesService;

@Component
public class NotesDeletionTask {
	@Autowired
	NotesService notesService;
	
	@Scheduled(cron="0 0 * * * *")	//Run every hour
	public void scheduleDeleteOldNotes(){
		
		notesService.deleteOldNotes();
		System.out.println("Scheduled Task hourly: Deleted old notes successfully");
	}
}
