package com.ruscassie.todolist;

import com.ruscassie.todolist.controller.TaskController;
import com.ruscassie.todolist.repository.TaskRepository;
import com.ruscassie.todolist.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

	@WebAppConfiguration
	@SpringBootTest
	@AutoConfigureMockMvc(addFilters = false)
	@ActiveProfiles("test")
	class TodolistApplicationTests {

		@Mock
		private TaskService taskService;

		@Mock
		private TaskRepository taskRepository;

		private static final String CONTENT_TYPE = "application/json;charset=UTF-8";

		@InjectMocks
		private TaskController taskController;

		@Autowired
		private MockMvc mockMvc;

		@Test
		public void testTask() throws Exception {

			final MvcResult result = mockMvc
					.perform(get("/tasks/2")).andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.id").value("2"))
					.andExpect(jsonPath("$.title").value("US 3 : Detail a TODO"))
					.andExpect(jsonPath("$.description").value("As a user I would like to display " +
							"one of my task in a separate or dedicated view.This task will contain its title" +
							" and a description(which is a new information not shown in the previous view)."))
					.andExpect(jsonPath("$.create").value("2021-06-17T14:00:00.000+00:00")).andReturn();
		}

		@Test
		public void testTasks() throws Exception {

			 mockMvc
					.perform(get("/tasks")).andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.[0].id").value("0"))
					.andExpect(jsonPath("$.[0].title").value("US 1 : List my TODOs"))
					.andExpect(jsonPath("$.[0].description").value("As a user I would like to list my current tasks"))
					.andExpect(jsonPath("$.[0].done").value("2021-07-27T14:00:00.000+00:00"))
					.andExpect(jsonPath("$.[0].create").value("2021-06-27T14:00:00.000+00:00"))

					.andExpect(jsonPath("$.[1].id").value("1"))
					.andExpect(jsonPath("$.[1].title").value("US 2 : Change a TODO state"))
					.andExpect(jsonPath("$.[1].description").value("As a user I would like to change a task state by checking a box"))
					.andExpect(jsonPath("$.[1].done").isEmpty())
					.andExpect(jsonPath("$.[1].create").value("2021-07-10T14:00:00.000+00:00"))

					.andExpect(jsonPath("$.[2].id").value("2"))
					.andExpect(jsonPath("$.[2].title").value("US 3 : Detail a TODO"))
					.andExpect(jsonPath("$.[2].description").value("As a user I would like to display " +
							"one of my task in a separate or dedicated view.This task will contain its title" +
							" and a description(which is a new information not shown in the previous view)."))
					.andExpect(jsonPath("$.[2].create").value("2021-06-17T14:00:00.000+00:00")).andReturn();

		}

		@Test
		public void testAddTasks() throws Exception {

			 mockMvc
					.perform(post("/tasks")
							.contentType(MediaType.APPLICATION_JSON)
					.content("{\n" +
							"\"title\":\"Title\",\n" +
							"\"description\":\"description\",\n" +
							"\"done\":\"2021-07-28T15:43:33.918+00:00\"\n" +
							"}"))
            .andDo(print())
					.andExpect(status().is2xxSuccessful());

			final MvcResult result = mockMvc
					.perform(get("/tasks/3")).andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.id").value("3"))
					.andExpect(jsonPath("$.title").value("Title"))
					.andExpect(jsonPath("$.description").value("description"))
					.andExpect(jsonPath("$.done").value("2021-07-28T15:43:33.918+00:00")).andReturn();

		}
	}

