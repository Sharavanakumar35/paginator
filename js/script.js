const xhr = new XMLHttpRequest();

const url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"

xhr.open("GET", url);

let jsonData = {};


xhr.onload = () => {
    if(xhr.status === 200) {
        jsonData = JSON.parse(xhr.responseText);
        // console.log(jsonData);

        itemsPerPage = 5;
        pageNumber = 1;

        // Initalize

            // Clicking on itemsPerPage dropdown
            const itemsPerPageDropDown = document.getElementById("rowsPerPage");
                itemsPerPageDropDown.addEventListener('change', function() {
                    itemsPerPage = Number(itemsPerPageDropDown.value);
                    renderTableBody(pageNumber);
                    renderPaginator();
            });
        
            // Table Creation
            const table = document.getElementById("jsonTable");
        
            // Clear existing table
            table.innerHTML = "";
        
            // header
            const header = document.createElement("thead");
        
            Object.keys(jsonData[0]).forEach(key => {
                let thead = document.createElement("th");
        
                thead.innerText = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                header.appendChild(thead);
            });
        
        
            table.appendChild(header);
        
            // body
            
            const body = document.createElement("tbody");
        
            function renderTableBody(pageNumber) {

                body.innerHTML = "";
                let firstIndex = (pageNumber-1) * itemsPerPage;
                let lastIndex = firstIndex + itemsPerPage;

        
                let paginatedData = jsonData.slice(firstIndex, lastIndex);
        
                paginatedData.forEach(item => {
                    let trow = document.createElement("tr");
                
                    Object.entries(item).forEach(([_key, value]) => {
                        let tdata = document.createElement("td");
                        tdata.innerText = value;
                        trow.appendChild(tdata);
                    });
                
                    body.appendChild(trow);
                });

                table.appendChild(body);
            }
        
        
            // paginator
            function renderPaginator() {
                
                const paginator = document.getElementById("buttons");

                paginator.innerHTML = "";
            
                totalPages = Math.ceil(jsonData.length / itemsPerPage);

                firstBtn = document.createElement("button");
                firstBtn.innerText = "First";
                firstBtn.type = "button";
                firstBtn.classList.add("btn", "btn-light", "mx-1", "mt-4"); 
                
                firstBtn.addEventListener("click", () => {
                    firstBtn.classList.add("btn", "btn-primary");
                    firstBtn.classList.remove("btn-light");
                    pageNumber = 1;
                    renderTableBody(pageNumber); 
                    
                    document.querySelectorAll(".btn").forEach(button => {
                        button.classList.remove("btn-primary");
                        button.classList.add("btn-light");
                    });

                    pgBtn = document.querySelector(`.pagebutton1`);
                    pgBtn.classList.add('btn', 'btn-primary');
                    pgBtn.classList.remove("btn-light");
                });
                paginator.appendChild(firstBtn);

                prevBtn = document.createElement("button");
                prevBtn.innerText = "Previous";
                prevBtn.type = "button";
                prevBtn.classList.add("btn", "btn-light", "mx-1", "mt-4"); 
                prevBtn.addEventListener("click", () => {
                    pageNumber--;
                    pageNumber = pageNumber > 0 ? pageNumber : totalPages;
                    prevBtn.classList.add("btn", "btn-primary");
                    prevBtn.classList.remove("btn-light");
                    renderTableBody(pageNumber); 

                    document.querySelectorAll(".btn").forEach(button => {
                        button.classList.remove("btn-primary");
                        button.classList.add("btn-light");
                    });

                    pgBtn = document.querySelector(`.pagebutton${pageNumber}`);
                    pgBtn.classList.add('btn', 'btn-primary');
                    pgBtn.classList.remove("btn-light");
                    // renderPaginator()
                });
                paginator.appendChild(prevBtn);

            
                for(let i=1; i<=totalPages; i++) {
            
                    let pageBtn = document.createElement("button");
                    pageBtn.type = "button";
                    pageBtn.innerText = i;
                    pageBtn.classList.add("btn", "btn-light", "mx-1", "mt-4", `pagebutton${i}`); 
                    pageBtn.addEventListener("click", () => {
                        // Reset to grey
                        document.querySelectorAll(".btn").forEach(button => {
                            button.classList.remove("btn-primary");
                            button.classList.add("btn-light");
                        });

                        // set clicked btn to blue
                        pageBtn.classList.add('btn', 'btn-primary');
                        pageBtn.classList.remove("btn-light");
                        pageNumber = i;
                        renderTableBody(pageNumber); 
                        // renderPaginator()
                    });
                    
                    paginator.appendChild(pageBtn);
            
                }

                nxtBtn = document.createElement("button");
                nxtBtn.innerText = "Next";
                nxtBtn.type = "button";
                nxtBtn.classList.add("btn", "btn-light", "mx-1", "mt-4"); 
                nxtBtn.addEventListener("click", () => {
                    pageNumber++;
                    pageNumber = pageNumber > totalPages ? pageNumber % totalPages : pageNumber;
                    nxtBtn.classList.add("btn", "btn-primary");
                    nxtBtn.classList.remove("btn-light");
                    renderTableBody(pageNumber); 

                    document.querySelectorAll(".btn").forEach(button => {
                        button.classList.remove("btn-primary");
                        button.classList.add("btn-light");
                    });

                    pgBtn = document.querySelector(`.pagebutton${pageNumber}`);
                    pgBtn.classList.add('btn', 'btn-primary');
                    pgBtn.classList.remove("btn-light");
                    // renderPaginator()
                });
                paginator.appendChild(nxtBtn);


                lastBtn = document.createElement("button");
                lastBtn.innerText = "Last";
                lastBtn.type = "button";
                lastBtn.classList.add("btn", "btn-light", "mx-1", "mt-4"); 
                lastBtn.addEventListener("click", () => {
                    lastBtn.classList.add("btn", "btn-primary");
                    lastBtn.classList.remove("btn-light");
                    pageNumber = totalPages
                    renderTableBody(pageNumber); 
                    
                    document.querySelectorAll(".btn").forEach(button => {
                        button.classList.remove("btn-primary");
                        button.classList.add("btn-light");
                    });

                    pgBtn = document.querySelector(`.pagebutton${totalPages}`);
                    pgBtn.classList.add('btn', 'btn-primary');
                    pgBtn.classList.remove("btn-light");
                });
                paginator.appendChild(lastBtn);

            }

            renderTableBody(pageNumber);
            renderPaginator();
            
    }
}
xhr.send();
