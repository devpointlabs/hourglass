<Form style={{ padding: "10px" }} onSubmit={this.handleSubmit}>
  <Header>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px"
      }}
    >
      Project
      <Select
        value={this.state.project}
        onChange={this.handleChange1}
        options={projectSelectOptions}
        defaultValue={{ label: "select Project", value: 0 }}
      />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        marginBottom: "20px"
      }}
    >
      Task
      <Select
        value={this.state.task}
        onChange={this.handleChange2}
        options={taskSelectOptions}
      />
    </div>
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px", marginLeft: "10px" }}>
            <Form.Input
              maxLength="5"
              label="Date"
              name="startMonthDay"
              placeholder="MM/DD"
              onChange={this.handleChange}
              value={this.state.startMonthDay}
            />
            <Form.Input
              maxLength="4"
              label="Year"
              name="year"
              placeholder="YYYY"
              onChange={this.handleChange}
              value={this.state.year}
            />
          </div>
          <div
            style={{
              width: "180px",
              paddingLeft: "20px",
              paddingRight: "0"
            }}
          >
            <Form.Input
              maxLength="8"
              label="Start Time"
              name="startHourMinute"
              placeholder="HH:mm am"
              onChange={this.handleChange}
              value={this.state.startHourMinute}
            />
          </div>
          {/* <div
        style={{
          width: "90px",
          paddingLeft: "0",
          paddingRight: "20px"
        }}
      >
        <Form.Input
          maxLength="2"
          label="am/pm"
          name="startAmPm"
          placeholder="am"
          onChange={this.handleChange}
          value={this.state.startAmPm}
        />
      </div> */}
          <div
            style={{
              width: "180px",
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <Form.Input
              maxLength="8"
              label="End Time"
              name="endHourMinute"
              placeholder="HH:mm pm"
              onChange={this.handleChange}
              value={this.state.endHourMinute}
            />
            <Button
              style={{
                marginLeft: "40px",
                marginTop: "30px",
                width: "100px"
              }}
              onClick={() => this.clearAddTimesheet()}
            >
              Clear
            </Button>
          </div>
          {/* <div
        style={{
          width: "90px",
          paddingLeft: "0",
          paddingRight: "20px"
        }}
      >
        <Form.Input
          maxLength="2"
          label="am/pm"
          name="endAmPm"
          placeholder="pm"
          onChange={this.handleChange}
          value={this.state.endAmPm}
        />
      </div> */}
          <div style={{ width: "100px" }}>
            <Form.Input
              autoFocus
              placeholder="hh.hh"
              maxLength="8"
              label="Hours"
              name="hours"
              onChange={this.handleChange}
              value={this.state.hours}
            />
            <Button
              style={{
                marginTop: "30px",
                width: "100px",
                color: "white",
                background: "RebeccaPurple"
              }}
              onClick={() => this.addManualBlock()}
            >
              Submit
            </Button>
          </div>
        </div>
        <div style={{ background: "white" }}>
          <div>
            <TimerStartStopButton
              large={true}
              handleClick={this.handleClick}
              id={this.props.timeBlock ? this.props.timeBlock.id : null}
            />
          </div>
          <div style={{ height: "40px" }}>
            <Transition
              visible={this.state.entryLoggedVisible}
              animation="scale"
              duration={{ show: 1, hide: 4000 }}
              onHide={() => this.setState({ entryLoggedVisible: false })}
            >
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "20px"
                }}
              >
                Entry Logged
                <Icon name="checkmark" />
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <Checkbox
        style={{ marginLeft: "20px", marginTop: "20px" }}
        label="manually entered"
        name="manualEnterCheckbox"
      />
    </div>
  </Header>
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <Button onClick={() => handleClose()}>Back</Button>
  </div>
</Form>;
