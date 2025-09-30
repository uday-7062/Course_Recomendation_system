// ========== MAIN APPLICATION CODE ==========

document.addEventListener("DOMContentLoaded", function() {
    // Clean up any existing drag handlers
    document.querySelectorAll(".item.course").forEach(course => {
        course.removeAttribute("ondragstart");
    });

    // Define elective courses for each program
    window.coursesMap = {
        // CS Program electives
        "CS": {
            "CS3000": ["CS 3140", "CS 3160", "CS 3180", "CS 3200", "CS 3210", "CS 3240", "CS 3320", "CS 3600", "CS 3710", "CS 3720", "CS 3800", "CS 3901", "CS 3950"],
            "CS4000": ["CS 4050", "CS 4090", "CS 4100", "CS 4170", "CS 4200", "CS 4250", "CS 4320", "CS 4330", "CS 4400", "CS 4420", "CS 4540", "CS 4620", "CS 4630", "CS 4800", "CS 4900"],
            "MATH": ["MATH 1290", "MATH 1310", "MATH 2130", "MATH 2140", "MATH 2150", "MATH 2160", "MATH 2320", "MATH 2340", "MATH 2450", "MATH 2910", "MATH 2960", "MATH 3130", "MATH 3220", "MATH 3280", "MATH 3320", "MATH 3370", "MATH 3390", "MATH 3410", "MATH 3420", "MATH 3430", "MATH 3440", "MATH 4000", "MATH 4010", "MATH 4020", "MATH 4030", "MATH 4040", "MATH 4110", "MATH 4140", "MATH 4150", "MATH 4170", "MATH 4210", "MATH 4250", "MATH 4260", "MATH 4270", "MATH 4320", "MATH 4340", "MATH 4370", "MATH 4390", "MATH 4410", "MATH 4420", "MATH 4440", "MATH 4450", "MATH 4470", "MATH 4510", "MATH 4520", "MATH 4610", "MATH 4650", "MATH 4660", "MATH 4700", "MATH 4890", "MATH 4900"]
        },
        // SE Program electives
        "SE": {
            "CS3000/4000": ["CS 3140", "CS 3160", "CS 3180", "CS 3200", "CS 3060", "CS 3240", "CS 3320", "CS 3600", "CS 3710", "CS 3720", "CS 3800", "CS 3900", "CS 3901", "CS 3950", "CS 4050", "CS 4090", "CS 4100", "CS 4170", "CS 4200", "CS 4250", "CS 4320", "CS 4330", "CS 4400", "CS 4420", "CS 4540", "CS 4120", "CS 4630", "CS 4800", "CS 4900"],
            "MATH/SCI": ["MATH 1290", "MATH 1310", "MATH 2130", "MATH 2140", "MATH 2150", "MATH 2160", "MATH 2320", "MATH 2340", "MATH 2450", "MATH 2910", "MATH 2960", "MATH 3130", "MATH 3220", "MATH 3280", "MATH 3320", "MATH 3370", "MATH 3390", "MATH 3410", "MATH 3420", "MATH 3430", "MATH 3440", "MATH 4000", "MATH 4010", "MATH 4020", "MATH 4030", "MATH 4040", "MATH 4110", "MATH 4140", "MATH 4150", "MATH 4170", "MATH 4210", "MATH 4250", "MATH 4260", "MATH 4270", "MATH 4320", "MATH 4340", "MATH 4370", "MATH 4390", "MATH 4410", "MATH 4420", "MATH 4440", "MATH 4450", "MATH 4470", "MATH 4510", "MATH 4520", "MATH 4610", "MATH 4650", "MATH 4660", "MATH 4700", "MATH 4890", "MATH 4900"],
            "MATH": ["MATH 1290", "MATH 1310", "MATH 2130", "MATH 2140", "MATH 2150", "MATH 2160", "MATH 2320", "MATH 2340", "MATH 2450", "MATH 2910", "MATH 2960", "MATH 3130", "MATH 3220", "MATH 3280", "MATH 3320", "MATH 3370", "MATH 3390", "MATH 3410", "MATH 3420", "MATH 3430", "MATH 3440", "MATH 4000", "MATH 4010", "MATH 4020", "MATH 4030", "MATH 4040", "MATH 4110", "MATH 4140", "MATH 4150", "MATH 4170", "MATH 4210", "MATH 4250", "MATH 4260", "MATH 4270", "MATH 4320", "MATH 4340", "MATH 4370", "MATH 4390", "MATH 4410", "MATH 4420", "MATH 4440", "MATH 4450", "MATH 4470", "MATH 4510", "MATH 4520", "MATH 4610", "MATH 4650", "MATH 4660", "MATH 4700", "MATH 4890", "MATH 4900"]
        },
        // CDS Program electives
        "CDS": {
            "CDS": ["CS 4200", "CS 4250", "CS 4420", "MATH 3430"],
            "ELE": ["CS 3140", "CS 3160", "CS 3180", "CS 3200", "CS 3210", "CS 3240", "CS 3320", "CS 3600", "CS 3710", "CS 3720", "CS 3800", "CS 3900", "CS 3901", "CS 3950", "CS 4050", "CS 4090", "CS 4100", "CS 4170", "CS 4200", "CS 4250", "CS 4320", "CS 4330", "CS 4400", "CS 4420", "CS 4540", "CS 4620", "CS 4630", "CS 4800", "CS 4900"]
        },
        // BA Program electives
        "BA": {
            "CS4000": ["CS 4050", "CS 4090", "CS 4100", "CS 4120", "CS 4170", "CS 4200", "CS 4250", "CS 4320", "CS 4330", "CS 4400", "CS 4420", "CS 4540", "CS 4620", "CS 4630", "CS 4800", "CS 4900"]
        },
        // BSCS Program electives
        "BSCS": {
            "MATH/SCI": ["MATH 1290", "MATH 1310", "MATH 2130", "MATH 2140", "MATH 2150", "MATH 2160", "MATH 2320", "MATH 2340", "MATH 2450", "MATH 2910", "MATH 2960", "MATH 3130", "MATH 3220", "MATH 3280", "MATH 3320", "MATH 3370", "MATH 3390", "MATH 3410", "MATH 3420", "MATH 3430", "MATH 3440", "MATH 4000", "MATH 4010", "MATH 4020", "MATH 4030", "MATH 4040", "MATH 4110", "MATH 4140", "MATH 4150", "MATH 4170", "MATH 4210", "MATH 4250", "MATH 4260", "MATH 4270", "MATH 4320", "MATH 4340", "MATH 4370", "MATH 4390", "MATH 4410", "MATH 4420", "MATH 4440", "MATH 4450", "MATH 4470", "MATH 4510", "MATH 4520", "MATH 4610", "MATH 4650", "MATH 4660", "MATH 4700", "MATH 4890", "MATH 4900"]
        },
        // BACS Program electives
        "BACS": {
            "MATH/SCI": ["MATH 1290", "MATH 1310", "MATH 2130", "MATH 2140", "MATH 2150", "MATH 2160", "MATH 2320", "MATH 2340", "MATH 2450", "MATH 2910", "MATH 2960", "MATH 3130", "MATH 3220", "MATH 3280", "MATH 3320", "MATH 3370", "MATH 3390", "MATH 3410", "MATH 3420", "MATH 3430", "MATH 3440", "MATH 4000", "MATH 4010", "MATH 4020", "MATH 4030", "MATH 4040", "MATH 4110", "MATH 4140", "MATH 4150", "MATH 4170", "MATH 4210", "MATH 4250", "MATH 4260", "MATH 4270", "MATH 4320", "MATH 4340", "MATH 4370", "MATH 4390", "MATH 4410", "MATH 4420", "MATH 4440", "MATH 4450", "MATH 4470", "MATH 4510", "MATH 4520", "MATH 4610", "MATH 4650", "MATH 4660", "MATH 4700", "MATH 4890", "MATH 4900"]
        }
    };

    // Initialize global objects
    window.courseData = {};
    window.currentSemesters = {};
    
    initializeApplication();

    // Set up course click handlers
    document.addEventListener("click", function(event) {
        const courseElement = event.target.closest(".item.course");
        if (courseElement) {
            const programContainer = courseElement.closest(".program-container");
            clearCourseSelectionUI(programContainer);
            courseElement.classList.add("selected-course");

            // Remember the last clicked course element so electives can be replaced
            window.selectedElectiveElement = courseElement;

            const responseDiv = programContainer.querySelector("#response");
            const newResponseDiv = programContainer.querySelector("#newresponse");
            responseDiv.style.display = "block";
            newResponseDiv.style.display = "block";

            const courseId = courseElement.getAttribute("data-id")?.trim().replace(/\s+/g, "").toUpperCase() || "";
            
            if (handleElectiveCourses(courseId, programContainer)) {
                return;
            }
            
            handleSpecificCourseTypes(courseId, programContainer);
            fetchCourseDetails(courseId, programContainer);
        }
    });

    // Initialize elective dropdowns for all programs
    document.querySelectorAll(".program-container").forEach(program => {
        initializeElectiveDropdowns(program);
    });
});

// ========== DRAG AND DROP FUNCTIONS ==========

function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    const element = event.target.closest(".item.course");
    if (!element) return;
    event.dataTransfer.setData("text/plain", element.id);
    event.dataTransfer.setData("program-id", element.closest(".program-container").id);
    element.classList.add("dragging");

    const courseId = element.getAttribute("data-id")?.trim().replace(/\s+/g, "").toUpperCase() || "";
    if (courseId) {
        // Clear previous highlights
        const programContainer = element.closest(".program-container");
        programContainer.querySelectorAll(".item.course").forEach(c => {
            c.classList.remove("drag-hint-prereq", "drag-hint-postreq");
        });
        
        // Highlight related courses
        highlightRelatedCourses(courseId, programContainer);
    }
}

function dragOver(event) {
    event.preventDefault();
    const target = event.target.closest(".course-container") || event.target.closest(".item.course");
    if (target) {
        target.classList.add("drag-over");
        if (target.classList.contains("course-container")) {
            target.style.backgroundColor = "#f0f8ff";
        }
    }
}

function dragLeave(event) {
    const target = event.target.closest(".course-container") || event.target.closest(".item.course");
    if (target) {
        target.classList.remove("drag-over");
        if (target.classList.contains("course-container")) {
            target.style.backgroundColor = "";
        }
    }
}

async function drop(event) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    const sourceProgramId = event.dataTransfer.getData("program-id");
    const draggedElement = document.getElementById(draggedId);
    if (!draggedElement) return;
    
    const targetProgramContainer = event.target.closest(".program-container");
    if (!targetProgramContainer) return;

    // Prevent cross-program drops
    if (sourceProgramId !== targetProgramContainer.id) {
        showError("Cannot move courses between different programs", targetProgramContainer);
        draggedElement.classList.add("invalid-drop");
        setTimeout(() => draggedElement.classList.remove("invalid-drop"), 1000);
        clearDragFeedback(targetProgramContainer);
        return;
    }

    clearDragFeedback(targetProgramContainer);

    const targetElement = event.target.closest(".item.course");
    const targetContainer = event.target.closest(".course-container");
    
    const draggedCourseId = draggedElement.getAttribute("data-id")?.trim().replace(/\s+/g, "").toUpperCase() || "";
    const targetCourseId = targetElement?.getAttribute("data-id")?.trim().replace(/\s+/g, "").toUpperCase() || "";
    
    if (targetElement && targetElement !== draggedElement) {
        // If target is an empty slot, validate placement against that slot's container index
        if (!targetElement.getAttribute("data-id")) {
            const allContainers = Array.from(targetProgramContainer.querySelectorAll(".course-container"));
            const targetIndex = allContainers.indexOf(targetElement.parentNode);
            const validation = await validateCoursePosition(draggedCourseId, targetIndex, targetProgramContainer);
            if (validation.valid) {
                swapElements(draggedElement, targetElement);
            } else {
                showError(validation.message, targetProgramContainer);
                draggedElement.classList.add("invalid-drop");
                setTimeout(() => draggedElement.classList.remove("invalid-drop"), 1000);
            }
            return;
        }
        
        // Normal validation for all courses
        const allContainers = Array.from(targetProgramContainer.querySelectorAll(".course-container"));
        const sourceIndex = allContainers.indexOf(draggedElement.parentNode);
        const targetIndex = allContainers.indexOf(targetElement.parentNode);
        
        const [draggedValid, targetValid] = await Promise.all([
            validateCoursePosition(draggedCourseId, targetIndex, targetProgramContainer),
            validateCoursePosition(targetCourseId, sourceIndex, targetProgramContainer)
        ]);

        if (draggedValid.valid && targetValid.valid) {
            swapElements(draggedElement, targetElement);
        } else {
            let errorMessage = "";
            if (!draggedValid.valid) errorMessage += draggedValid.message + "\n";
            if (!targetValid.valid) errorMessage += targetValid.message + "\n";
            showError(errorMessage, targetProgramContainer);
            draggedElement.classList.add("invalid-drop");
            setTimeout(() => draggedElement.classList.remove("invalid-drop"), 1000);
        }
    }
    else if (targetContainer) {
        // Handle dropping into a container (not swapping with another course)
        const allContainers = Array.from(targetProgramContainer.querySelectorAll(".course-container"));
        const targetIndex = allContainers.indexOf(targetContainer);
        
        const validation = await validateCoursePosition(draggedCourseId, targetIndex, targetProgramContainer);
        
        if (validation.valid) {
            handleContainerDrop(draggedElement, targetContainer, targetProgramContainer);
        } else {
            showError(validation.message, targetProgramContainer);
            draggedElement.classList.add("invalid-drop");
            setTimeout(() => draggedElement.classList.remove("invalid-drop"), 1000);
        }
    }
}

// ========== SWAP FUNCTIONS ==========

function swapElements(element1, element2) {
    if (element1 === element2) return;
    
    const parent1 = element1.parentNode;
    const parent2 = element2.parentNode;
    
    // Create temporary placeholders
    const temp1 = document.createElement("div");
    const temp2 = document.createElement("div");
    
    parent1.insertBefore(temp1, element1);
    parent2.insertBefore(temp2, element2);
    
    // Perform the swap
    parent1.replaceChild(element2, temp1);
    parent2.replaceChild(element1, temp2);
    
    // Move empty elements to bottom in both containers
    moveEmptyElementsToBottom(parent1);
    moveEmptyElementsToBottom(parent2);
    
    // Visual feedback
    element1.classList.add("swap-success");
    element2.classList.add("swap-success");
    setTimeout(() => {
        element1.classList.remove("swap-success");
        element2.classList.remove("swap-success");
    }, 500);

    // Update program state and credits
    const programContainer = element1.closest(".program-container");
    updateSemesterState(programContainer);
    updateProgramSemesterCredits(programContainer);
}

function handleContainerDrop(draggedElement, dropContainer, programContainer) {
    const sourceContainer = draggedElement.parentNode;
    if (sourceContainer !== dropContainer) {
        // Find first empty slot in target container
        const emptySlot = dropContainer.querySelector(".item.course:not([data-id])");
        
        if (emptySlot) {
            dropContainer.insertBefore(draggedElement, emptySlot);
        } else {
            dropContainer.appendChild(draggedElement);
        }
        
        // Add new empty slot to source container
        const newEmpty = document.createElement("div");
        newEmpty.className = "item course";
        newEmpty.setAttribute("draggable", "true");
        newEmpty.addEventListener("dragstart", dragStart);
        sourceContainer.appendChild(newEmpty);
    }
    
    // Reorder empty slots
    moveEmptyElementsToBottom(dropContainer);
    moveEmptyElementsToBottom(sourceContainer);

    // Update semester state and credits
    updateSemesterState(programContainer);
    updateProgramSemesterCredits(programContainer);
}

function moveEmptyElementsToBottom(container) {
    if (!container) return;
    
    const courses = Array.from(container.querySelectorAll(".item.course"));
    const emptyCourses = courses.filter(c => !c.getAttribute("data-id"));
    const nonEmptyCourses = courses.filter(c => c.getAttribute("data-id"));
    
    container.innerHTML = "";
    nonEmptyCourses.forEach(course => container.appendChild(course));
    emptyCourses.forEach(course => container.appendChild(course));
}

// ========== VALIDATION FUNCTIONS ==========

async function validateCoursePosition(courseId, targetIndex, programContainer) {
    if (!courseId) return { valid: true };

    const programId = programContainer.id;
    if (isElectiveCourse(courseId, programId)) return { valid: true };

    // Ensure course data is loaded
    if (Object.keys(window.courseData).length === 0) {
        await loadAllCourseData();
    }

    const course = window.courseData[courseId];
    if (!course) {
        console.warn(`Course ${courseId} not found in database`);
        return { valid: true };
    }
    
    const allCourseIds = getAllCourseIdsWithSemesters(programContainer);

    // Validate prerequisites - make sure all prerequisites are in earlier semesters
    if (course.prerequisites && course.prerequisites.length > 0) {
        for (const prereq of course.prerequisites) {
            const prereqSemester = allCourseIds.find(c => c.id === prereq)?.semester;
            if (prereqSemester !== undefined) {
                if (prereqSemester > targetIndex) {
                    return { 
                        valid: false, 
                        message: `Cannot place ${courseId} in semester ${targetIndex + 1} because prerequisite ${prereq} is in later semester ${prereqSemester + 1}`
                    };
                }
                if (prereqSemester === targetIndex) {
                    return {
                        valid: false,
                        message: `Cannot place ${courseId} and its prerequisite ${prereq} in the same semester (${targetIndex + 1})`
                    };
                }
            }
        }
    }

    // Validate postrequisites - make sure all postrequisites are in later semesters
    if (course.postrequisites && course.postrequisites.length > 0) {
        for (const postreq of course.postrequisites) {
            const postreqSemester = allCourseIds.find(c => c.id === postreq)?.semester;
            if (postreqSemester !== undefined) {
                if (postreqSemester < targetIndex) {
                    return { 
                        valid: false, 
                        message: `Cannot place ${courseId} in semester ${targetIndex + 1} because postrequisite ${postreq} is in earlier semester ${postreqSemester + 1}`
                    };
                }
                if (postreqSemester === targetIndex) {
                    return {
                        valid: false,
                        message: `Cannot place ${courseId} and its postrequisite ${postreq} in the same semester (${targetIndex + 1})`
                    };
                }
            }
        }
    }

    // Check credit limits
    const currentCredits = calculateSemesterCredits(programContainer.id, targetIndex).totalCredits;
    const courseCredits = window.courseData[courseId]?.credits || 0;
    if (currentCredits + courseCredits > 18) {
        return { valid: false, message: `Total credits would exceed 18 in semester ${targetIndex + 1}` };
    }

    return { valid: true };
}

function isElectiveCourse(courseId, programId) {
    if (!courseId) return true;
    
    const programKey = programId.replace("-program", "");
    const programElectives = window.coursesMap[programKey];
    
    if (programElectives && Object.keys(programElectives).includes(courseId)) {
        return true;
    }
    
    const electivePatterns = [
        "CS3000", "CS4000", "CS3000/4000", 
        "MATH", "MATH/SCI", "CDS", "ELE",
        "ELECTIVE122", "MDC", "SOCIAL", "BGP"
    ];
    
    return electivePatterns.some(pattern => courseId.startsWith(pattern));
}

// ========== HELPER FUNCTIONS ==========

function clearDragFeedback(programContainer) {
    programContainer.querySelectorAll(".drag-over").forEach(elem => {
        elem.classList.remove("drag-over");
        elem.style.backgroundColor = "";
    });
    programContainer.querySelectorAll(".dragging").forEach(elem => elem.classList.remove("dragging"));
}

function getAllCourseIdsWithSemesters(programContainer) {
    const allCourseIds = [];
    const containers = programContainer.querySelectorAll(".course-container");
    containers.forEach((container, index) => {
        Array.from(container.querySelectorAll(".item.course")).forEach(c => {
            const id = c.getAttribute("data-id")?.trim().replace(/\s+/g, "").toUpperCase() || "";
            if (id) allCourseIds.push({ id, semester: index });
        });
    });
    return allCourseIds;
}

function highlightRelatedCourses(courseId, programContainer) {
    // Clear previous highlights
    programContainer.querySelectorAll(".item.course").forEach(c => {
        c.classList.remove("drag-hint-prereq", "drag-hint-postreq");
    });

    const course = window.courseData[courseId];
    if (!course) return;

    // Highlight prerequisites in green
    if (course.prerequisites && course.prerequisites.length > 0) {
        course.prerequisites.forEach(prereq => {
            const normalizedPrereq = prereq.replace(/\s+/g, "").toUpperCase();
            const elems = programContainer.querySelectorAll(`.item.course[data-id]`);
            elems.forEach(elem => {
                const elemId = elem.getAttribute("data-id")?.replace(/\s+/g, "").toUpperCase();
                if (elemId === normalizedPrereq) {
                    elem.classList.add("drag-hint-prereq");
                }
            });
        });
    }

    // Highlight postrequisites in red
    if (course.postrequisites && course.postrequisites.length > 0) {
        course.postrequisites.forEach(postreq => {
            const normalizedPostreq = postreq.replace(/\s+/g, "").toUpperCase();
            const elems = programContainer.querySelectorAll(`.item.course[data-id]`);
            elems.forEach(elem => {
                const elemId = elem.getAttribute("data-id")?.replace(/\s+/g, "").toUpperCase();
                if (elemId === normalizedPostreq) {
                    elem.classList.add("drag-hint-postreq");
                }
            });
        });
    }
}

function showError(message, programContainer) {
    let errorDiv = programContainer.querySelector(".error-message");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.position = "fixed";
        errorDiv.style.bottom = "20px";
        errorDiv.style.right = "20px";
        errorDiv.style.padding = "15px";
        errorDiv.style.backgroundColor = "#ffdddd";
        errorDiv.style.border = "1px solid #ff9999";
        errorDiv.style.borderRadius = "5px";
        errorDiv.style.zIndex = "1000";
        errorDiv.innerHTML = `
            <div>${message}</div>
            <button class="close-error" style="float: right; margin-left: 10px;"> </button>
        `;
        programContainer.appendChild(errorDiv);
        
        errorDiv.querySelector(".close-error").addEventListener("click", () => {
            errorDiv.style.display = "none";
        });
    }
    errorDiv.querySelector("div").textContent = message;
    errorDiv.style.display = "block";
}

// ========== COURSE DATA MANAGEMENT ==========

async function loadAllCourseData() {
    try {
        const response = await fetch("http://localhost:8080/get-courses");
        const jsonData = await response.json();
        jsonData.forEach(course => {
            if (course.subject) {
                // Handle cross-listed courses (e.g., "CS 4770 OR SE 4770")
                const courseNames = course.subject.split(/\s+OR\s+/i).map(name => 
                    name.split(/[-&]/)[0].trim().replace(/\s+/g, "").toUpperCase()
                );
                
                const courseData = {
                    prerequisites: course.prerequisites 
                        ? course.prerequisites.replace(/["']/g, "").split(/\s*,\s*/).map(pr => pr.trim().replace(/\s+/g, "").toUpperCase())
                        : [],
                    postrequisites: course.postrequisites 
                        ? course.postrequisites.split(", ").map(pr => pr.trim().replace(/\s+/g, "").toUpperCase()).filter(pr => pr !== "NONE")
                        : [],
                    credits: parseInt(course.credits) || 0
                };
                
                // Store the same data under all course names
                courseNames.forEach(courseName => {
                    if (courseName) {
                        window.courseData[courseName] = courseData;
                    }
                });
            }
        });
    } catch (error) {
        console.error("Error loading course data:", error);
    }
}

// ========== STATE MANAGEMENT ==========

function initializeSemesterState() {
    document.querySelectorAll(".program-container").forEach(program => {
        const programId = program.id;
        window.currentSemesters[programId] = {};
        const semesters = program.querySelectorAll(".course-container");
        semesters.forEach((semester, index) => {
            const courses = Array.from(semester.querySelectorAll(".item.course")).map(course => {
                return {
                    id: course.getAttribute("data-id"),
                    element: course,
                    credits: getCourseCredits(course)
                };
            });
            window.currentSemesters[programId][index] = courses;
        });
    });
}

function updateSemesterState(programContainer) {
    const programId = programContainer.id;
    const semesters = programContainer.querySelectorAll(".course-container");
    semesters.forEach((semester, index) => {
        window.currentSemesters[programId][index] = Array.from(semester.querySelectorAll(".item.course")).map(course => {
            return {
                id: course.getAttribute("data-id"),
                element: course,
                credits: getCourseCredits(course)
            };
        });
    });
}

function getCourseCredits(courseElement) {
    const courseId = courseElement.getAttribute("data-id");
    if (courseId && window.courseData[courseId] && window.courseData[courseId].credits) {
        return window.courseData[courseId].credits;
    }
    const creditMatch = courseElement.textContent.match(/\((\d+)\s*Cr\.\)/i);
    return creditMatch ? parseInt(creditMatch[1]) : 0;
}

// ========== CREDIT CALCULATION ==========

function calculateSemesterCredits(programId, semesterIndex) {
    const semester = window.currentSemesters[programId][semesterIndex];
    if (!semester) return { totalCredits: 0, hasLab: false, nonLabCredits: 0 };
    
    let totalCredits = 0;
    let hasLab = false;
    let nonLabCredits = 0;
    
    semester.forEach(course => {
        const credits = getCourseCredits(course.element);
        if (course.id === "NSL1" || course.id === "NSL2") {
            hasLab = true;
            totalCredits += credits;
        } else {
            nonLabCredits += credits;
            totalCredits += credits;
        }
    });
    
    return { totalCredits, hasLab, nonLabCredits };
}

function updateProgramSemesterCredits(programContainer) {
    const programId = programContainer.id;
    const semesterHeaders = programContainer.querySelectorAll("#courseTable thead tr:nth-child(3) th");
    
    if (!semesterHeaders || semesterHeaders.length === 0) return;
    
    for (let i = 0; i < 8; i++) {
        const { totalCredits, hasLab, nonLabCredits } = calculateSemesterCredits(programId, i);
        if (semesterHeaders[i]) {
            if (hasLab) {
                // Try to read the actual lab credit range text from the semester container
                const semesterContainer = programContainer.querySelectorAll(".course-container")[i];
                let rangeLabel = null;
                if (semesterContainer) {
                    const labElem = Array.from(semesterContainer.querySelectorAll(".item.course"))
                        .find(e => {
                            const id = e.getAttribute("data-id") || "";
                            return id === "NSL1" || id === "NSL2";
                        });
                    if (labElem) {
                        const text = labElem.textContent || "";
                        const m = text.match(/\((\d+)\s*-\s*(\d+)\s*Cr\./i);
                        if (m) {
                            const low = parseInt(m[1]);
                            const high = parseInt(m[2]);
                            rangeLabel = `${nonLabCredits + low}-${nonLabCredits + high} Cr.`;
                        }
                    }
                }
                semesterHeaders[i].textContent = rangeLabel ? rangeLabel : `${totalCredits} Cr.`;
            } else {
                semesterHeaders[i].textContent = `${totalCredits} Cr.`;
            }
        }
    }
}

function updateAllSemesterCredits() {
    document.querySelectorAll(".program-container").forEach(program => {
        updateProgramSemesterCredits(program);
    });
}

// ========== RESET FUNCTIONALITY ==========

function captureInitialState() {
    window.initialState = Array.from(document.querySelectorAll(".course-container")).map(container => ({
        parent: container,
        children: Array.from(container.children).map(child => ({ element: child.cloneNode(true) }))
    }));
}

function resetCourses() {
    if (!window.initialState) return;
    window.initialState.forEach(entry => {
        const parent = entry.parent;
        parent.innerHTML = "";
        entry.children.forEach(child => {
            const newChild = child.element.cloneNode(true);
            newChild.setAttribute("draggable", "true");
            newChild.addEventListener("dragstart", dragStart);
            parent.appendChild(newChild);
        });
    });
    
    // Clear all question textareas and response divs
    document.querySelectorAll(".program-container").forEach(program => {
        clearCourseSelectionUI(program);
        const questionTextarea = program.querySelector("#question");
        if (questionTextarea) {
            questionTextarea.value = "";
        }
    });
    
    initializeSemesterState();
    updateAllSemesterCredits();
    setupDragAndDrop();
}

function setupTextareaAutoResize() {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach(textarea => {
        textarea.addEventListener("input", function() {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        });
        textarea.dispatchEvent(new Event("input"));
    });
}

function setupDragAndDrop() {
    document.querySelectorAll(".program-container").forEach(program => {
        setupDragAndDropForProgram(program);
    });
}

function setupDragAndDropForProgram(programContainer) {
    // Clean up any existing handlers first
    programContainer.querySelectorAll(".item.course").forEach(course => {
        course.removeEventListener("dragstart", dragStart);
        course.setAttribute("draggable", "true");
        course.addEventListener("dragstart", dragStart);
    });
    
    programContainer.querySelectorAll(".course-container").forEach(container => {
        container.removeEventListener("dragover", allowDrop);
        container.removeEventListener("drop", drop);
        container.removeEventListener("dragleave", dragLeave);
        
        container.addEventListener("dragover", allowDrop);
        container.addEventListener("drop", drop);
        container.addEventListener("dragleave", dragLeave);
    });
    
    // Ensure empty slots are at the bottom
    programContainer.querySelectorAll(".course-container").forEach(container => {
        moveEmptyElementsToBottom(container);
    });
}

// ========== COURSE SELECTION UI ==========

function clearCourseSelectionUI(programContainer) {
    const responseDiv = programContainer.querySelector("#response");
    const newResponseDiv = programContainer.querySelector("#newresponse");
    const dropdownContainer = programContainer.querySelector("#dropdown-container");
    const questionTextarea = programContainer.querySelector("#question");
    
    if (responseDiv) {
        responseDiv.innerHTML = "";
        responseDiv.style.display = "none";
    }
    if (newResponseDiv) {
        newResponseDiv.innerHTML = "";
        newResponseDiv.style.display = "none";
    }
    if (dropdownContainer) {
        dropdownContainer.style.display = "none";
    }
    if (questionTextarea) {
        questionTextarea.value = "";
    }
    
    programContainer.querySelectorAll(".item.course").forEach(c => {
        c.classList.remove("highlight-prereq", "highlight-postreq", "selected-course", 
                          "highlight-indirect-prereq", "highlight-indirect-postreq", 
                          "drag-hint-prereq", "drag-hint-postreq");
    });
}

function handleElectiveCourses(courseId, programContainer) {
    const dropdownContainer = programContainer.querySelector("#dropdown-container");
    const electiveCourses = [
        "CS3000-1", "CS3000-2", "CS4000-1", "CS4000-2", "CS4000-3", 
        "MATH", "ELECTIVE122", "CS3000/4000-1", "CS3000/4000-2", "CS3000/4000-3",
        "MATH/SCI1", "MATH/SCI2", "CDS", "ELE"
    ];
    
    if (electiveCourses.includes(courseId)) {
        dropdownContainer.style.display = "block";
        const categoryDropdown = programContainer.querySelector("#categoryDropdown");
        categoryDropdown.innerHTML = '<option value="">--- Select Category ---</option>';
        
        // Get the current program
        const programId = programContainer.id.replace("-program", "");
        
        // Populate the dropdown based on the current program
        if (window.coursesMap[programId]) {
            Object.keys(window.coursesMap[programId]).forEach(category => {
                const option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                categoryDropdown.appendChild(option);
            });
        }
        
        programContainer.querySelector("#courseDropdownContainer").style.display = "none";
        return true;
    }
    return false;
}

function handleSpecificCourseTypes(courseId, programContainer) {
    const responseDiv = programContainer.querySelector("#response");
    const mdcElectives = ["MDC1", "MDC2", "MDC3", "MDC4"];
    const socialBehavioralCourses = ["SOCIAL1", "SOCIAL2"];
    const lab = ["NSL1", "NSL2"];
    const electives = ["ELECTIVE122"];
    const internship = ["CS3900"];
    const minorCourses = ["MINOR1", "MINOR2", "MINOR3", "MINOR4", "MINOR5", "MINOR6", "MINOR7"];
    const BGP = ["BGP", "BGP/ELECTIVE"];
    
    if (mdcElectives.includes(courseId)) {
        responseDiv.innerHTML = `<strong>Response:</strong> Refer for the below links to select the MDC Electives.
            <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/natural-sciences-approved-courses.html" target="_blank">Natural Sciences Courses</a>
            <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/social-and-behavioral-sciences-approved-courses.html" target="_blank">Social and Behavioral Sciences Courses</a>
            <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/arts-and-humanities-approved-courses.html" target="_blank">Arts and Humanities Courses</a>
            <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/multidisciplinary-component-approved-courses.html" target="_blank">Multidisciplinary Component Courses</a>`;
    } else if (socialBehavioralCourses.includes(courseId)) {
        responseDiv.innerHTML = `<strong>Response:</strong> Refer for the below link for selecting Social and Behavioral Science Courses.
            <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/social-and-behavioral-sciences-approved-courses.html" target="_blank">Social and Behavioral Sciences Courses</a>`;
    } else if (lab.includes(courseId)) {
        responseDiv.innerHTML = `<strong>Response:</strong> Refer for the below link for selecting Lab courses.
            <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/natural-sciences-approved-courses.html" target="_blank">Natural Science Lab Courses</a>`;
    } else if (courseId.startsWith("SPAN") || courseId.startsWith("FREN") || courseId.startsWith("GERM") || courseId.startsWith("LANG")) {
        responseDiv.innerHTML = `<strong>Response:</strong> Language courses must follow the sequence:
            <strong>1010 ? 1020 ? 2010 ? 2020</strong>. See the link below for details.
            <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/foreign-language-approved-courses.html" target="_blank">Foreign Language Courses</a>`;
    } else if (electives.includes(courseId)) {
        responseDiv.innerHTML = `<strong>Response:</strong> Any one of the Elective courses may be chosen.`;
    } else if (internship.includes(courseId)) {
        responseDiv.innerHTML = `<strong>Response:</strong> This course requires consent of department.`;
    } else if (BGP.includes(courseId)) {
        responseDiv.innerHTML = `<strong>Response:</strong> Refer for the below link to select BGP course for the program.
        <br><a href="https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/bg-perspective-course-list.html" target="_blank" rel="noopener noreferrer">BGP Courses</a>`;
    } else if (minorCourses.includes(courseId)) {
        responseDiv.innerHTML = `<strong>Response:</strong> Select courses from your declared minor program. You can refer for the link
         <br><a href="https://catalog.bgsu.edu/content.php?catoid=20&navoid=1457" target="_blank" rel="noopener noreferrer">Minor Courses</a>`;
    } else {
        const questionTextarea = programContainer.querySelector("#question");
        questionTextarea.value = `What are the prerequisites for Course ${courseId}?`;
        askQuestion(programContainer);
    }
}

function fetchCourseDetails(courseId, programContainer) {
    const selectedCourse = window.courseData[courseId];
    const newResponseDiv = programContainer.querySelector("#newresponse");
    if (!selectedCourse) {
        newResponseDiv.innerHTML = `<strong>Course information not found in database</strong>`;
        return;
    }
    const prereqs = selectedCourse.prerequisites || [];
    const postreqs = selectedCourse.postrequisites || [];
    newResponseDiv.innerHTML = `
        <strong>Prerequisites:</strong> ${prereqs.length > 0 ? prereqs.join(", ") : "None"}<br>
        <strong>Postrequisites:</strong> ${postreqs.length > 0 ? postreqs.join(", ") : "None"}
    `;
    highlightCourseRelationships(prereqs, postreqs, programContainer);
    const questionTextarea = programContainer.querySelector("#question");
    questionTextarea.value = `What are the prerequisites and postrequisites for ${courseId}?`;
}

function highlightCourseRelationships(prereqs, postreqs, programContainer) {
    // Clear previous highlights
    programContainer.querySelectorAll(".item.course").forEach(c => {
        c.classList.remove("highlight-prereq", "highlight-postreq", 
                         "highlight-indirect-prereq", "highlight-indirect-postreq");
    });

    // Highlight direct prerequisites
    prereqs.forEach(prereq => {
        const normalizedPrereq = prereq.replace(/\s+/g, "").toUpperCase();
        const elems = programContainer.querySelectorAll(`.item.course[data-id]`);
        elems.forEach(elem => {
            const elemId = elem.getAttribute("data-id")?.replace(/\s+/g, "").toUpperCase();
            if (elemId === normalizedPrereq) {
                elem.classList.add("highlight-prereq");
            }
        });
    });

    // Highlight direct postrequisites
    postreqs.forEach(postreq => {
        const normalizedPostreq = postreq.replace(/\s+/g, "").toUpperCase();
        const elems = programContainer.querySelectorAll(`.item.course[data-id]`);
        elems.forEach(elem => {
            const elemId = elem.getAttribute("data-id")?.replace(/\s+/g, "").toUpperCase();
            if (elemId === normalizedPostreq) {
                elem.classList.add("highlight-postreq");
            }
        });
    });

    // Find and highlight indirect relationships
    findIndirectPrereqs(prereqs, programContainer, new Set());
    findIndirectPostreqs(postreqs, programContainer, new Set());
}

function findIndirectPrereqs(prereqs, programContainer, visited) {
    prereqs.forEach(prereq => {
        const normalizedPrereq = prereq.replace(/\s+/g, "").toUpperCase();
        if (visited.has(normalizedPrereq)) return;
        visited.add(normalizedPrereq);
        
        const courseData = window.courseData[normalizedPrereq];
        if (!courseData) return;
        
        const indirect = courseData.prerequisites || [];
        if (indirect.length > 0) {
            indirect.forEach(ind => {
                const normalizedInd = ind.replace(/\s+/g, "").toUpperCase();
                const elems = programContainer.querySelectorAll(`.item.course[data-id]`);
                elems.forEach(elem => {
                    const elemId = elem.getAttribute("data-id")?.replace(/\s+/g, "").toUpperCase();
                    if (elemId === normalizedInd) {
                        elem.classList.add("highlight-indirect-prereq");
                    }
                });
            });
            findIndirectPrereqs(indirect, programContainer, visited);
        }
    });
}

function findIndirectPostreqs(postreqs, programContainer, visited) {
    postreqs.forEach(postreq => {
        const normalizedPostreq = postreq.replace(/\s+/g, "").toUpperCase();
        if (visited.has(normalizedPostreq)) return;
        visited.add(normalizedPostreq);
        
        const indirect = Object.entries(window.courseData)
            .filter(([_, data]) => (data.prerequisites || []).includes(normalizedPostreq))
            .map(([courseId]) => courseId);
            
        if (indirect.length > 0) {
            indirect.forEach(ind => {
                const normalizedInd = ind.replace(/\s+/g, "").toUpperCase();
                const elems = programContainer.querySelectorAll(`.item.course[data-id]`);
                elems.forEach(elem => {
                    const elemId = elem.getAttribute("data-id")?.replace(/\s+/g, "").toUpperCase();
                    if (elemId === normalizedInd) {
                        elem.classList.add("highlight-indirect-postreq");
                    }
                });
            });
            findIndirectPostreqs(indirect, programContainer, visited);
        }
    });
}

// ========== QUESTION ANSWERING ==========

async function askQuestion(programContainer) {
    const question = programContainer.querySelector("#question").value;
    const responseDiv = programContainer.querySelector("#response");
    responseDiv.innerHTML = "Processing your question...";
    try {
        const resp = await fetch("http://localhost:8080/ask-question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });
        const data = await resp.json();
        responseDiv.innerHTML = `<strong>Response:</strong> ${data.response}`;
    } catch (error) {
        console.error("Error:", error);
        responseDiv.innerHTML = "Error processing your question.";
    }
}

// ========== ELECTIVE DROPDOWNS ==========

function initializeElectiveDropdowns(programContainer) {
    const categoryDropdown = programContainer.querySelector("#categoryDropdown");
    const courseDropdownContainer = programContainer.querySelector("#courseDropdownContainer");
    if (categoryDropdown) {
        categoryDropdown.addEventListener("change", function() {
            const selectedCategory = this.value;
            if (selectedCategory) {
                populateCourseDropdown(selectedCategory, programContainer);
                courseDropdownContainer.style.display = "block";
            } else {
                courseDropdownContainer.style.display = "none";
            }
        });
    }
    const courseDropdown = programContainer.querySelector("#courseDropdown");
    if (courseDropdown) {
        courseDropdown.addEventListener("change", function() {
            const selectedCourse = this.value.trim();
            if (selectedCourse) {
                // Update the clicked elective tile with the chosen course
                applySelectedElective(programContainer, selectedCourse);
                courseDropdownContainer.style.display = "none";
            }
        });
    }
}

function populateCourseDropdown(category, programContainer) {
    const courseDropdown = programContainer.querySelector("#courseDropdown");
    if (!courseDropdown) return;
    courseDropdown.innerHTML = `<option value="">--- Select Course ---</option>`;
    
    // Get the current program
    const programId = programContainer.id.replace("-program", "");
    
    if (category && window.coursesMap[programId] && window.coursesMap[programId][category]) {
        window.coursesMap[programId][category].forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseDropdown.appendChild(option);
        });
    }
}

// ========== GLOBAL FUNCTIONS FOR ELECTIVE SELECTION ==========

window.categorySelected = function() {
    const programContainer = document.querySelector(".program-container:not([style*='display: none'])");
    const selectedCategory = programContainer.querySelector("#categoryDropdown").value;
    const courseDropdownContainer = programContainer.querySelector("#courseDropdownContainer");
    if (selectedCategory) {
        populateCourseDropdown(selectedCategory, programContainer);
        courseDropdownContainer.style.display = "block";
    } else {
        courseDropdownContainer.style.display = "none";
    }
};

window.courseSelected = function() {
    const programContainer = document.querySelector(".program-container:not([style*='display: none'])");
    const selectedCourse = programContainer.querySelector("#courseDropdown").value.trim();
    if (selectedCourse) {
        // Apply elective selection into the last clicked elective slot
        applySelectedElective(programContainer, selectedCourse);
        programContainer.querySelector("#courseDropdownContainer").style.display = "none";
    }
};

// Replace the clicked elective placeholder with the chosen concrete course
function applySelectedElective(programContainer, selectedCourseLabel) {
    const targetElement = window.selectedElectiveElement;
    if (!targetElement) return;

    // Normalize ID like "CS 4200" -> "CS4200"
    const normalizedId = selectedCourseLabel.replace(/\s+/g, "").toUpperCase();

    // Determine credits from loaded course data (fallback to 3)
    const credits = (window.courseData && window.courseData[normalizedId] && window.courseData[normalizedId].credits)
        ? window.courseData[normalizedId].credits
        : 3;

    // Update DOM for the slot
    targetElement.setAttribute("data-id", normalizedId);
    targetElement.innerHTML = `${selectedCourseLabel}<br>(${credits} Cr.)`;

    // Clear elective UI selection state
    const dropdownContainer = programContainer.querySelector("#dropdown-container");
    if (dropdownContainer) dropdownContainer.style.display = "none";

    // Recompute semester state and header credits
    updateSemesterState(programContainer);
    updateProgramSemesterCredits(programContainer);

    // Ask prerequisites/postrequisites for the chosen concrete course
    const questionTextarea = programContainer.querySelector("#question");
    if (questionTextarea) {
        questionTextarea.value = `What are the prerequisites and postrequisites for ${normalizedId}?`;
        askQuestion(programContainer);
    }
}

// ========== INITIALIZATION ==========

function initializeApplication() {
    loadAllCourseData();
    initializeSemesterState();
    captureInitialState();
    setupDragAndDrop();
    setupTextareaAutoResize();
    updateAllSemesterCredits();
}