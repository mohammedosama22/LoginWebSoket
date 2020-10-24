package com.qeema.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.qeema.app.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

	@Query("select count(*) from Users s where s.isLogged='true'")
	public int getTotalNumberOfLoggedUsers();
	
	@Query("select count(*) from Users s ")
	public int getTotalNumberOfUsers();
	
	
	@Query("select s from Users s where s.email=:email") 
	public Users getUserByEmail(@Param("email") String email);

	/*
	 * @Transactional
	 * 
	 * @Modifying
	 * 
	 * @Query("delete from Users s where s.username=:username") public void
	 * deleteUserByUserName(@Param ("username") String username);
	 */

	
	  @Query("select  s from Users s where s.email=:email and s.password=:password") 
	  public Users getUserByUserName(@Param ("email") String email , @Param("password") String password);
	 

}
