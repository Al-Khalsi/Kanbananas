// Package logger. logger provides global log variable and log initialization.
package logger

import (
	"github.com/sirupsen/logrus"
)

var Log *logrus.Logger

func init() {
	Log = logrus.New()
	Log.SetReportCaller(true) // Enable caller reporting
}
