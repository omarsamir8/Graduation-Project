import { Button } from "react-bootstrap";
import "../styles/department.scss";
import { useNavigate } from "react-router-dom";
function Department() {
  const usenavigate = useNavigate();
  const NavigateToQuiz = () => {
    usenavigate("/generate_department");
  };
  const DepMat = [
    "Opreating system",
    " Databases 1",
    " Artifcial intelligence",
    "Sowftware Engineering 1",
    "Operation Research",
    "Software Project Mangement",
    "Information Storage And Management",
    "Web Programming",
    "Modeling and Simulation",
    "Data Mining",
    "Databases 2",
    "Intelligent Information System",
    "Mobile Application",
    "Information Secuirty",
    "Cloud Computing",
    "Decision Support System",
  ];
  const DepDoctors = [
    "Dr.Mohamed Abd El Fatah",
    "Dr.Tarak El Sheshtawy",
    "Dr.Karm",
    "Dr.Mostafa El Gendy",
    "Dr.Fady",
    "Dr.shaymaa Talet",
    "Dr.Mona Arafa",
    "Dr.Ahmed Shalpy",
  ];
  const colors = [
    "#FFD3E8",
    "#f4dba5",
    "#55cfdf",
    "ff6262",
    "#0034ff",
    "#ffd3e8",
    "#fc73b5",
  ];
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  const style = {
    background: colors[randomColorIndex],
  };
  return (
    <>
      <div className="departments">
        <div className="department">
          <h3>Information System (IS)</h3>
          <h5>Description</h5>
          <p>
            The Information Systems department at a College of Computer Science
            and Information typically focuses on the study of designing,
            developing, and managing information systems within enterprises and
            organizations. Here's a general description of an Information
            Systems department: Electronic Systems Design: This specialization
            involves learning how to design and build electronic information
            systems that meet the needs of businesses and companies, whether
            they are web applications, database management systems, or mobile
            applications. Data Management: This aspect deals with how to
            efficiently and securely collect, store, and organize data,
            including databases and data management techniques. Data Analysis:
            Data analysis entails using tools and techniques to understand and
            extract knowledge from data, supporting decision-making processes
            within enterprises. Information Security: Focuses on protecting data
            and information from security threats, including hacking, malware,
            and breaches. Information Technology in Business: Studies how to use
            technology to improve business operations and achieve greater
            efficiency and effectiveness in companies and organizations. Web and
            Mobile Applications: Focuses on developing web and mobile
            applications that provide innovative and user-friendly interfaces.
            Management Information Technology: Studies how to use information
            technology to support administrative processes in enterprises such
            as planning, organizing, and controlling. Technology Innovation:
            Encourages research and development in the field of information
            technology, including the development of new applications and
            technological innovations.
          </p>
          <h5>Matarials</h5>
          <div className="dep-courses">
            {DepMat.map((mat) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-course"
                >
                  {mat}
                </p>
              );
            })}
          </div>
          <h5>Doctors</h5>
          <div className="dep-doctors">
            {DepDoctors.map((doc) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-doctor"
                >
                  {doc}
                </p>
              );
            })}
          </div>
        </div>
        <div className="department">
          <h3>Computer Science (CS)</h3>
          <h5>Description</h5>
          <p>
            Computer Science within the College of Computing and Information is
            an expansive academic field that delves into the intricacies of
            computing systems and their applications across various domains. It
            encompasses a diverse array of subjects, ranging from fundamental
            theories to practical implementations. Students explore programming
            paradigms, software engineering methodologies, database management,
            network architectures, cybersecurity protocols, artificial
            intelligence algorithms, machine learning techniques, data
            analytics, cloud computing infrastructures, web development
            frameworks, and beyond. The curriculum empowers students to
            cultivate robust problem-solving skills, hone their programming
            prowess, and foster a deep understanding of computational
            principles. Through hands-on projects, collaborative research
            endeavors, and experiential learning opportunities, students gain
            proficiency in developing scalable software solutions, optimizing
            system performance, safeguarding digital assets, and harnessing
            emerging technologies to address real-world challenges. Furthermore,
            the field offers avenues for specialization, enabling students to
            delve deeper into areas such as computer graphics, human-computer
            interaction, bioinformatics, robotics, and more, aligning with their
            passions and career aspirations. By immersing themselves in a
            dynamic learning environment, students emerge as versatile
            professionals equipped to innovate, adapt, and lead in the
            ever-evolving landscape of technology.
          </p>
          <h5>Matarials</h5>
          <div className="dep-courses">
            {DepMat.map((mat) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-course"
                >
                  {mat}
                </p>
              );
            })}
          </div>
          <h5>Doctors</h5>
          <div className="dep-doctors">
            {DepDoctors.map((doc) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-doctor"
                >
                  {doc}
                </p>
              );
            })}
          </div>
        </div>
        <div className="department">
          <h3>Artificial Intelligence (AI) </h3>
          <h5>Description</h5>
          <p>
            Artificial Intelligence (AI) is a multidisciplinary field within
            computer science that focuses on creating systems capable of
            performing tasks that typically require human intelligence. This
            encompasses a broad spectrum of techniques, methodologies, and
            applications aimed at mimicking cognitive functions such as
            learning, reasoning, problem-solving, perception, and language
            understanding. At its core, AI seeks to develop algorithms and
            models that enable machines to perceive their environment, interpret
            data, make decisions, and adapt to changing circumstances
            autonomously. This involves leveraging various approaches, including
            machine learning, neural networks, deep learning, natural language
            processing, computer vision, evolutionary algorithms, and
            reinforcement learning, among others. In practical terms, AI
            technologies have revolutionized numerous industries and domains,
            ranging from healthcare and finance to transportation and
            entertainment. They power intelligent systems such as virtual
            assistants, recommendation engines, autonomous vehicles, medical
            diagnosis systems, fraud detection algorithms, and personalized
            content delivery platforms. Within academic settings, the study of
            AI involves delving into advanced mathematical concepts, statistical
            methods, optimization techniques, algorithmic design, and
            computational modeling. Students explore the theoretical foundations
            of AI, experiment with cutting-edge algorithms, analyze real-world
            datasets, and develop AI-powered applications through hands-on
            projects. Moreover, AI research continually pushes the boundaries of
            what machines can achieve, driving innovations in areas like
            explainable AI, ethical AI, AI safety, and AI governance. As AI
            continues to evolve and permeate every facet of society, it presents
            both unprecedented opportunities and profound challenges, shaping
            the future of technology and human-machine interaction.
          </p>
          <h5>Matarials</h5>
          <div className="dep-courses">
            {DepMat.map((mat) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-course"
                >
                  {mat}
                </p>
              );
            })}
          </div>
          <h5>Doctors</h5>
          <div className="dep-doctors">
            {DepDoctors.map((doc) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-doctor"
                >
                  {doc}
                </p>
              );
            })}
          </div>
        </div>
        <div className="department">
          <h3>Scientific Computing (SC)</h3>
          <h5>Description</h5>
          <p>
            The field of Scientific Computing within the College of Computing
            and Information involves the application of computational and
            mathematical techniques to solve scientific, engineering, and
            technical problems. This specialization combines knowledge of
            computing and mathematics to enable students to develop and analyze
            complex mathematical models and perform necessary computations using
            high-performance computing. Areas of study in Scientific Computing
            include applications in physics, engineering, chemistry, biology,
            medicine, environmental sciences, earth sciences, technology, and
            more. This specialization focuses on developing mathematical models,
            computer simulations, analytical computations, and numerical
            solutions for complex scientific problems. Students of Scientific
            Computing learn to use high-performance computing tools and
            programming languages such as MATLAB, Python, R, and others, in
            addition to understanding the mathematical foundations underlying
            these tools. They also develop skills in mathematical analysis,
            creative thinking, handling big data, and applying visualization and
            data analysis techniques. Applications of Scientific Computing
            include designing and modeling physical systems, analyzing big data,
            predicting natural phenomena, designing drugs, analyzing engineering
            structures, predicting climate changes, developing medical imaging
            techniques, and much more. In summary, the specialization in
            Scientific Computing at the College of Computing and Information
            represents a harmonious blend of computing and mathematics aimed at
            solving modern scientific and engineering problems using advanced
            computing techniques.
          </p>
          <h5>Matarials</h5>
          <div className="dep-courses">
            {DepMat.map((mat) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-course"
                >
                  {mat}
                </p>
              );
            })}
          </div>
          <h5>Doctors</h5>
          <div className="dep-doctors">
            {DepDoctors.map((doc) => {
              return (
                <p
                  style={{ backgroundColor: "#647295" }}
                  className="dep-doctor"
                >
                  {doc}
                </p>
              );
            })}
          </div>
        </div>
        {/* Form for recommend department */}
        <div style={{ background: "" }} className="recommendation_title col-12">
          <h4 className="col-12">Department Recommendation</h4>
          <div className="go_to_quiz">
            <Button
              style={{ backgroundColor: "#996ae4", borderColor: "#996ae4" }}
              onClick={NavigateToQuiz}
            >
              Go to quiz
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Department;
