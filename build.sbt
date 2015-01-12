name := """spreadsheet"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.2"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  javaWs,
  "org.mongodb" % "mongo-java-driver" % "2.12.4",
  "org.webjars" % "bootstrap" % "3.3.0",
  "org.webjars" % "angularjs" % "1.3.0",
  "org.webjars" % "angular-ui-bootstrap" % "0.11.2",
  "org.webjars" % "angular-ui-router" % "0.2.11-1",
  "org.webjars" % "font-awesome" % "4.2.0",
  "org.webjars" % "react" % "0.12.1",
  "org.webjars" % "lodash" % "2.4.1-6",
  "org.webjars" % "react-bootstrap" % "0.13.0"
)

javacOptions ++= Seq("-Xlint:unchecked")