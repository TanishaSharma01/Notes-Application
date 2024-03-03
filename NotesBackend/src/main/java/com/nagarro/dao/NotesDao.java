package com.nagarro.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nagarro.entity.Notes;
import com.nagarro.entity.User;

public interface NotesDao extends JpaRepository<Notes, Long>{
	//Query to find top 10 recently added posts
	List<Notes> findTop10ByUserOrderByCreatedAtDesc(User user);
	
	//Query to find notes of a specific user
	List<Notes> findByUser(User user);
	
	//Get List of notes for a user by sorting in descending order of time created at 
	List<Notes> findByUserOrderByCreatedAtDesc(User user);	
	
	@Query("SELECT COUNT(n) FROM Notes n WHERE n.user.id = :userId")
	Long getNotesCount(@Param("userId") Long userId);
}
